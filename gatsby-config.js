require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
    siteMetadata: {
        title: `The PM Group | San Antonio’s Largest Ad and Marketing Agency`,
        description: `The PM Group is San Antonio's top advertising & marketing agency, leading in award-winning and results-driven campaigns with over 30 years of expertise.`,
        author: `@NoisyTrumpet`,
        siteUrl: `https://thepmgrp.com`,
    },
    flags: {
        FAST_DEV: true,
        PRESERVE_FILE_DOWNLOAD_CACHE: true,
    },
    // proxy: {
    //   prefix: `/__third-party-proxy?url=*`,
    //   url: `https://coop-atm.mygenfcu.workers.dev/?:splat`,
    // },
    // partytownProxiedURLs: [
    //   `https://www.googletagmanager.com/gtag/js?id=${process.env.GATSBY_GOOGLE_TAG_MANAGER_ID}`,
    //   `https://www.google-analytics.com/analytics.js`,
    //   `https://www.google-analytics.com`,
    // ],
    plugins: [
        "@chakra-ui/gatsby-plugin",
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-image`,
        // {
        //   resolve: `gatsby-plugin-advanced-sitemap`,
        //   // options: {
        //   //   additionalSitemaps: [
        //   //     {
        //   //       url: `https://thepmgrp.sitemap.xml`,
        //   //     },
        //   //   ],
        //   // },
        //   // Exclude links:
        //   exclude: [`/dev-404-page`, `/404`, `/404.html`],
        // },
        // Force Trailing Slash: failed and caused errors
        // `gatsby-plugin-force-trailing-slashes`,
        // Peact for speed!
        // `gatsby-plugin-preact`,
        `gatsby-plugin-sass`,
        {
            resolve: "gatsby-plugin-robots-txt",
            options: {
                host: "https://thepmgrp.com",
                sitemap: "https://thepmgrp.com/sitemap.xml",
                policy: [
                    {
                        userAgent: "*",
                        allow: "/",
                        disallow: [
                            "/login/",
                            "/cgi-bin/",
                            "/wp-admin/",
                            "/wp-login.php",
                            "/wp-admin/admin-ajax.php",
                            "/wp-",
                            "/?s=",
                            "*&s=",
                            "/search",
                            "/author/",
                            "*?attachment_id=",
                            "*/feed",
                            "*/rss",
                            "*/embed",
                            "/wp-admin/",
                            "/trackback/",
                            "/tag/*",
                            "/category/agency-news/",
                            "/category/uncategorized/",
                            "/product/*",
                            "/our-work/case-studies/*",
                            "/the-pm-group-supports-art-vinyl/*",
                            "/agency-news/page*",
                            "/tag/*",
                            "/category/agency-news/",
                            "/category/uncategorized/",
                            "/product/*",
                            "/our-work/leadership/",
                            "/our-work/case-study/",
                        ],
                    },
                ],
            },
        },

        {
            /**
             * First up is the WordPress source plugin that connects Gatsby
             * to your WordPress site.
             *
             * visit the plugin docs to learn more
             * https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-wordpress/README.md
             *
             */
            resolve: `gatsby-source-wordpress`,
            options: {
                url: process.env.WPGRAPHQL_URL,
                // // Production
                debug: {
                    preview: true,
                },
                production: {
                    hardCacheMediaFiles: true,
                    allow404Images: true,
                },
                // Development
                develop: {
                    hardCacheData: true,
                    hardCacheMediaFiles: true,
                },
                schema: {
                    timeout: 100000,
                    perPage: 25,
                },
                // Don't use gatsby image in html
                html: {
                    useGatsbyImage: false,
                },
                type: {
                    Post: {
                        limit:
                            process.env.NODE_ENV === "development"
                                ? // Lets just pull 50 posts in development to make it easy on ourselves (aka. faster).
                                175
                                : // and we don't actually need more than 5000 in production for this particular site
                                500,
                    },
                },
            },
        },
        // Removing Gravity Forms from the build in favor of netlify forms
        // {
        //   resolve: "gatsby-source-gravityforms",
        //   options: {
        //     // Base URL needs to include protocol (http/https)
        //     baseUrl: process.env.BASE_URL,
        //     // Gravity Forms API
        //     api: {
        //       key: process.env.CONSUMER_KEY,
        //       secret: process.env.CONSUMER_SECRET,
        //     },
        //     // Set to true to enable selfsigned certs in development mode
        //     allowSelfSigned: false,
        //     // Basic Auth
        //     // basicAuth: {
        //     //   username: process.env.HTTPBASICAUTH_USERNAME,
        //     //   password: process.env.HTTPBASICAUTH_PASSWORD,
        //     // },
        //     // ignoreFields: [
        //     //     // Top level fields within the Gravity Forms return
        //     //     // to ignore.
        //     //     // Default ignore is 'notifications'. To keep this
        //     //     // as set, remove the ignoreFields setting from here.
        //     //     // If adding more fields, you will need to include
        //     //     // notifications to ensure it is ignored.
        //     // ],
        //   },
        // },
        {
            resolve: `gatsby-plugin-breadcrumb`,
            options: {
                // defaultCrumb: optional To create a default crumb
                // see Click Tracking default crumb example below
                useAutoGen: true,
                autoGenHomeLabel: `Home`,
                defaultCrumb: {
                    // location: required and must include the pathname property
                    location: {
                        pathname: "https://thepmgrp.com",
                    },
                    // crumbLabel: required label for the default crumb
                    crumbLabel: "Home",
                    // all other properties optional
                    crumbSeparator: " / ",
                },
                // generate breadcrumbs for (see below for details).
                exclude: [
                    `**/dev-404-page/**`,
                    `**/404/**`,
                    `**/404.html`,
                    `**/offline-plugin-app-shell-fallback/**`,
                ],
                trailingSlashes: true,
                // usePathPrefix: optional, if you are using pathPrefix above
                // usePathPrefix: '/blog',
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-plugin-sharp`,
            options: {
                // Defaults used for gatsbyImageData and StaticImage
                // defaults: {},
                // Set to false to allow builds to continue on image errors
                failOn: "none",
                // deprecated options and their defaults:
                // base64Width: 20,
                // forceBase64Format: ``, // valid formats: png,jpg,webp
                // useMozJpeg: process.env.GATSBY_JPEG_ENCODER === `MOZJPEG`,
                // stripMetadata: true,
                // defaultQuality: 50,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `the-pmg-group`,
                short_name: `pmg`,
                start_url: `https://thepmgrp.com/`,
                background_color: `#201D1D`,
                theme_color: `#201D1D`,
                display: `minimal-ui`,
                icon: `./src/images/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },
        // `gatsby-plugin-remove-fingerprints`,
        // {
        //   resolve: `gatsby-plugin-gatsby-cloud`, // `gatsby-plugin-gatsby-cloud`
        //   options: {
        //     allPageHeaders: [
        //       "Strict-Transport-Security: max-age=31536000; includeSubDomains; preload",
        //     ],
        //     headers: {
        //       "/*": ["Cache-Control: public, max-age=31536000, immutable"],
        //       "static/*": ["Cache-Control: public, max-age=31536000, immutable"],
        //     },
        //   },
        // },
        // `gatsby-plugin-preact`,
        `gatsby-plugin-advanced-sitemap`, // Sitemap
        // Alias Imports:
        {
            resolve: "gatsby-alias-imports",
            options: {
                aliases: {
                    Components: "src/components",
                    Constants: "src/constants",
                    Features: "src/features",
                    Graphql: "src/graphql",
                    Hooks: "src/hooks",
                    Pages: "src/pages",
                    Styles: "src/styles",
                    Svg: "static/svg",
                    Utils: "src/utils",
                    Static: "static",
                },
            },
        },
        "gatsby-plugin-netlify", // make sure to keep it last in the array
    ],
}
