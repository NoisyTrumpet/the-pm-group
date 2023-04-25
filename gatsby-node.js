// import fetch from "node-fetch"
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")
const redirects = require("./redirects.json")
const fetch = (...args) =>
    import(`node-fetch`).then(({ default: fetch }) => fetch(...args))

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage, createRedirect } = actions
    // Redirects
    redirects.forEach(redirect =>
        createRedirect({
            fromPath: redirect.fromPath,
            toPath: redirect.toPath,
        })
    )
    return new Promise((resolve, reject) => {
        graphql(
            `{
          workTemplates: allWpCategory {
            edges {
              node {
                id
                uri
                slug
                name
              }
            }
          }
          leadershipTemplates: allWpLeader {
            edges {
              node {
                id
                slug
              }
            }
          }
          allWpPost(sort: { date: DESC }, limit: 1000) {
            edges {
              node {
                id
                uri
                slug
                internal {
                  type
                }
              }
            }
          }
        }
      `
        ).then(result => {
            if (result.errors) {
                reporter.panicOnBuild(`Error while running GraphQL query.`)
                return
            }
            // Work Items
            const workItems = result.data.workTemplates.edges
            // Leadership Items
            const leadershipItems = result.data.leadershipTemplates.edges
            // Posts:
            const posts = result.data.allWpPost.edges
            // Blog Pages:
            const postsPerPage = 12
            const numPages = Math.ceil(posts.length / postsPerPage)
            workItems.forEach(cat => {
                if (cat.node.name !== "Agency News") {
                    createPage({
                        path: `/our-work/${cat.node.slug}/`,
                        component: path.resolve("./src/templates/category.js"),
                        context: {
                            slug: cat.node.slug,
                        },
                        ownerNodeId: cat.node.id,
                    })
                }
                resolve()
            })

            leadershipItems.forEach(item => {
                createPage({
                    path: item.node.slug,
                    component: path.resolve("./src/templates/leader.js"),
                    context: {
                        slug: item.node.slug,
                    },
                    ownerNodeId: item.node.id,
                })
                resolve()
            })

            posts.forEach(post => {
                createPage({
                    path: `/news/${post.node.slug}/`,
                    component: path.resolve("./src/templates/blog.js"),
                    context: {
                        id: post.node.id,
                        // content: post.node.content,
                        // title: post.node.title,
                        // seo: post.node.seo,
                    },
                    ownerNodeId: post.node.id,
                })
                resolve()
            })
            Array.from({ length: numPages }).forEach((_, i) => {
                createPage({
                    path: i === 0 ? `/news` : `/news/${i + 1}/`,
                    component: path.resolve("./src/templates/news.js"),
                    context: {
                        limit: postsPerPage,
                        skip: i * postsPerPage,
                        numPages,
                        currentPage: i + 1,
                    },
                })
                resolve()
            })
        })
    })
}
