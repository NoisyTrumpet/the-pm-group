module.exports = [{
      plugin: require('../node_modules/@chakra-ui/gatsby-plugin/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-image/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-catch-links/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-source-wordpress/gatsby-browser.js'),
      options: {"plugins":[],"url":"https://thepmgroup.flywheelsites.com/graphql","auth":{"htaccess":{"username":"pm-group","password":"website"}},"develop":{"hardCacheData":true,"hardCacheMediaFiles":true,"nodeUpdateInterval":5000},"schema":{"requestConcurrency":10,"timeout":300000,"queryDepth":15,"circularQueryLimit":5,"typePrefix":"Wp","perPage":100,"previewRequestConcurrency":5},"type":{"Post":{"limit":500},"RootQuery":"{ excludeFieldNames: ['viewer', 'node', 'schemaMd5'], },"},"verbose":true},
    },{
      plugin: require('../node_modules/gatsby-plugin-breadcrumb/gatsby-browser.js'),
      options: {"plugins":[],"useAutoGen":true,"autoGenHomeLabel":"Home","defaultCrumb":{"location":{"pathname":"/"},"crumbLabel":"Home","crumbSeparator":" / "},"exclude":["**/dev-404-page/**","**/404/**","**/404.html","**/offline-plugin-app-shell-fallback/**"]},
    },{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"the-pmg-group","short_name":"pmg","start_url":"/","background_color":"#663399","theme_color":"#663399","display":"minimal-ui","icon":"src/images/gatsby-icon.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"8d36d058a685b7582d4929b27b515f2b"},
    },{
      plugin: require('../node_modules/gatsby-plugin-preact/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
