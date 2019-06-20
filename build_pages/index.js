const pages = {
    airQuality: {
      // page 的入口
      entry: 'src/pages/airQuality/main.js',
      // 模板来源
      template: 'public/airQuality.html',
      // 在 dist/airQuality.html 的输出
      filename: 'airQuality.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '空气质量',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'airQuality']
    },
    airCalendar: {
      entry: 'src/pages/airCalendar/main.js',
      // 模板来源
      template: 'public/airCalendar.html',
      // 在 dist/airQuality.html 的输出
      filename: 'airCalendar.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '空气日历',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'airCalendar']
    },
    observePoint: {
      entry: 'src/pages/observePoint/main.js',
      // 模板来源
      template: 'public/observePoint.html',
      // 在 dist/airQuality.html 的输出
      filename: 'observePoint.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '监测点',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'observePoint']
    },
    aqiTrend: {
      entry: 'src/pages/aqiTrend/main.js',
      // 模板来源
      template: 'public/aqiTrend.html',
      // 在 dist/airQuality.html 的输出
      filename: 'aqiTrend.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '监测点',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'aqiTrend']
    }
  }

module.exports =  pages