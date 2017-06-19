# shbc-benefit-overpayment

## Data Transfer Processs: Benefit Overpayment File Archive

### Objective

Check for the existence of two data files once a day, that have been created today as a result of work carried out by the Benefits team the previous day.
If one or both of those files exist add them to an archive file and place them in a predefined location, ready for the Benefits team to transfer to the DWP's website.
Notify the Benefits team that the archive file is there and the Devops Slack channel to report on the status of the process.

### Resources

Environment Variables:

- location A: `envA`
- location B: `envB`
- file 1 example file name: `env1`
- archive file example file name: `envArc`
- slack account url: `slack`
- slack icon url : `slackIcon`

NPM Dependencies:
- moment
- node-slackr
- tar
- promise

### Algorithm

1. search `envA` for today's file (`env1` / `env2`)
2. if file(s) exist archive them into a TAR with a predefined name: `envArc`
3. notify Revs & Bens that the TAR file is present using SMTP
4. notify Devops the process outcome with Slack
