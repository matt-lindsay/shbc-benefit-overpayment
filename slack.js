'use strict';

var Slack = require('node-slackr');

module.exports = function(message, color, title) {
    var slack = new Slack(process.env.slack);
    //var data = JSON.stringify(message);
    var messages = {};
    messages = {
        channel: '#devops_notifications',
        text: "Benefit Overpayment",
        username: 'shbc nodejs',
        icon_url: process.env.slackIcon,
        attachments: [
            {
                color: color,
                fields: [
                    {
                        title: title
                      }
                ],
                text: message
              }
        ]
      };
    slack.notify(messages, function(err, result) {
        if (err) console.log('>>> Slack errors: ' + err + '. ');
        console.log('>>> Slack notification: ' + result + '.');
      });
  };