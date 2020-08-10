module.exports = {
  transpileDependencies: [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        "appId": "com.sitewhere.admin",
        "productName": "SiteWhere Admin",
        "publish": [
          {
            "provider": "github",
            "owner": "sitewhere",
            "repo": "sitewhere-admin-ui"
          }
        ],
        "win": {
          "target": "nsis"
        },
        "dmg": {
          "icon": null
        },
        "mac": {
          "category": "public.app-category.business"
        },
        "linux": {
          "category": "Monitor"
        }
      }
    }
  }
}