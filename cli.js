import { Octokit } from "octokit";
import { config } from "dotenv";
config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

async function run() {
  console.log(process.env.GITHUB_TOKEN);
  const { data: user } = await octokit.request('GET /user');

  console.log(`Authenticated as ${user.login}`);

  // get the README
  const { data: readme } = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    // https://api.github.com/repos/javij98/octokit-training/contents/README.md
    {
      owner: "javij98",
      repo: "octokit-training",
      path: "README.md"
    }
  );

  const readmeContent = Buffer.from(readme.content, 'base64').toString();
  console.log(readmeContent);
  const updated = bumpBoopCounter(readmeContent);

  console.log(updated);

  const response = await octokit.request(
    "PUT /repos/{owner}/{repo}/content/{path}",
    {
      owner: "javij98",
      repo: "octokit-training",
      path: 'README.md',
      message: 'Trying to change a file with GitHub API',
      content: Buffer.from(updated, 'utf8').toString('base64'),
      sha: readme.sha
    });

  console.dir(response.data);
}

function bumpBoopCounter(content) {
  return content.replace(
    'learning',
    (_content, counter) => 'learninggg'
  );
}

run();
