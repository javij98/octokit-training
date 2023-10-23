import { Octokit } from "octokit";
import { config } from "dotenv";
config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

async function run() {
  console.log(process.env.GITHUB_TOKEN);
  const user = await octokit.request('GET /user');

  console.log(`Authenticated as ${user.data.login}`);

  // get the README
  const { data: readme } = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: "javij98",
      repo: "-TrabajoApps",
      path: "README.md"
    }
  );

  console.log(readme.sha);

  // const response = await octokit.request(
  //     "GET /repos/{owner}/{repo}/content/{path}",
  //     {
  //         owner: "javij98",
  //         repo: "-TrabajoApps",
  //         //per_page: 2
  //         path: 'README.md',
  //         mesage: 'lala',
  //         content: 'lalala lalala'
  //     });

  // console.dir(response.data);
}

run();
