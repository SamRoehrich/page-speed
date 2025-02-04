/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "ps",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          region: "us-west-1",
          profile:
            input.stage === "production" ? "spinach-production" : "spinach-dev",
        },
      },
    };
  },
  async run() {
    const vpc = new sst.aws.Vpc("PageSpeedVPC");

    const cluster = new sst.aws.Cluster("PageSpeedCluster", { vpc });
    cluster.addService("PageSpeedService", {
      loadBalancer: {
        ports: [{ listen: "80/http", forward: "3000/http" }],
      },
      dev: {
        command: "bun dev",
      },
    });
  },
});
