/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")
// const fs = require('fs');
const { createFilePath } = require("gatsby-source-filesystem")
const fetch = require("node-fetch")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(
      `
        {
          workTemplates: allWpCategory {
            edges {
              node {
                uri
                nodeType
                slug
                name
              }
            }
          }
          leadershipTemplates: allWpLeader {
            edges {
              node {
                slug
              }
            }
          }
          allWpPost(sort: { fields: date, order: DESC }, limit: 1000) {
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
        if (cat.node.name !== "Agency News" && cat.node.name !== "Case Study") {
          createPage({
            path: `/our-work/${cat.node.slug}`,
            component: path.resolve("./src/templates/category.js"),
            context: {
              slug: cat.node.slug,
            },
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
        })
        resolve()
      })

      posts.forEach((post, index) => {
        createPage({
          path: `/news/${post.node.slug}`,
          component: path.resolve("./src/templates/blog.js"),
          context: {
            id: post.node.id,
          },
          // index is zero-based index
          defer: index + 1 > 20,
        })
        resolve()
      })
      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? `/news` : `/news/${i + 1}`,
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
// POSTS & YARPP Tuning
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Post`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type WpPost implements Node {
      related_posts: WpNodePost!
    }
    type WpNodePost implements Node {
      nodes: [WpPost]
    }
  `
  createTypes(typeDefs)
}
// Flywheel Password Removal
// let auth =
//   "Basic " +
//   Buffer.from(
//     process.env.HTTPBASICAUTH_USERNAME +
//       ":" +
//       process.env.HTTPBASICAUTH_PASSWORD
//   ).toString("base64")
// let headers = {
//   Authorization: auth,
// }

// Testing Image Cache fix: failed
// exports.onPostBuild = async ({ reporter }) => {
//   await fs.ensureDir("node_modules/.cache/gatsby-source-filesystem")

//   if (fs.existsSync(".cache/gatsby-source-filesystem")) {
//     console.log("onPostBuild: Copying gatsby-source-filesystem to node_modules")
//     await fs.copy(
//       ".cache/gatsby-source-filesystem",
//       "node_modules/.cache/gatsby-source-filesystem"
//     )
//   }
// }

// exports.onPreBootstrap = async ({ reporter }) => {
//   if (fs.existsSync("node_modules/.cache/gatsby-source-filesystem")) {
//     console.log("onPreBootstrap: Copying gatsby-source-filesystem to .cache")
//     await fs.copy(
//       "node_modules/.cache/gatsby-source-filesystem",
//       ".cache/gatsby-source-filesystem"
//     )
//   }
// }

exports.createResolvers = async ({ createResolvers, schema }) =>
  createResolvers({
    WpPost: {
      related_posts: {
        resolve: async (source, args, context, info) => {
          const { databaseId } = source

          const response = await fetch(
            `${process.env.BASE_URL}/wp-json/yarpp/v1/related/${databaseId}?limit=3`
          ).then(res => res.json())

          if (response && response.length) {
            const result = await context.nodeModel.runQuery({
              query: {
                filter: { databaseId: { in: response.map(({ id }) => id) } },
              },
              type: "WpPost",
            })
            return { nodes: result }
          } else return { nodes: [] }
        },
      },
    },
  })
