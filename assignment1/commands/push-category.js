const fetch = require("node-fetch");

module.exports = program => {
  program.command('push-category')
    .description('Push category to DHIS2 instance')
    .option("-s , --source [source]", 'Source of category')
    .option("-su , --source-username [sourceUsername]", 'Username of source')
    .option("-sp , --source-password [sourcePassword]", 'Password of source')
    .option("-t , --target [target]", 'Target for pushing')
    .option("-tu , --target-username [targetUsername]", 'Username of target')
    .option("-tp , --target-password [targetPassword]", 'Password of target')
    .action(async(args) => {
      console.log(args);
      let source = args.source;
      let sourceUsername = args.aaaa;
      let sourcePassword = args.sourcePassword;
      let target = args.target;
      let targetUsername = args.targetUsername;
      let targetPassword = args.targetPassword;
      let payload = {
        categoryOptions: []
      };
      console.log(sourceUsername);
      await fetch(source, {
          headers: {
            Authorization: "Basic " + new Buffer(sourceUsername + ":" + sourcePassword).toString("base64")
          }
        })
        .then(res => res.json())
        .then(json => {
          json.data.forEach(category => {
            payload.categoryOptions.push({
              id: category.id,
              name: category.name,
              shortName: category["short-name"]
            })
          });
          console.log(JSON.stringify(payload));
        });
      await fetch(target, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + new Buffer(targetUsername + ":" + targetPassword).toString("base64")
          },
          body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(json => console.log(json));

    });
};