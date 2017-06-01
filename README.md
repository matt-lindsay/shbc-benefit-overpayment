# shbc-benefit-overpayment

## Data Transfer Processs: Benefit Overpayment File Archive

### Objective

Check for the existence of two data files once a day, that have been created today as a result of work carried out by the Benefits team the previous day. If one or both of those files exist add them to an archive file and place them in a predefined location, ready for the Benefits team to transfer to the DWP's website. Notify the Benefits team that the archive file is there.

### Resources

- location A: `envA`
- location B: `envB`
- file 1 example file name: `env1`
- file 2 example file name: `env2`
- archive file example file name: `envArc`

### Algorithm

1. search `env1` for today's file (`env1` / `env2`)
2. copy each file to `env2`
3. archive each file into a TAR file with a predefined name: `envArc`
4. notify Revs & Bens that the TAR file is there
