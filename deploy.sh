# This script is used to deploy the application to AWS S3 and invalidate the CloudFront cache.

currentBranch=$(git branch --show-current);

echo "Current Branch: $currentBranch";

if [ $currentBranch != "main" ]
then
    echo "Invalid branch checked out for this main"
    exit 2;
fi

git fetch
local=$(git rev-parse $currentBranch);
remote=$(git rev-parse origin/$currentBranch);

echo "Local: $local";
echo "Remote: $remote";

if [ $local != $remote ]
then
    echo "Make sure your local branch that has been selected for deployment is the same as the remote branch."
    exit 2;
fi

# cp envs/.env.prod .env
yarn install
npm run build:prod
aws s3 sync  --profile memes-lab ./dist s3://lab-purchases
aws cloudfront create-invalidation --profile memes-lab --distribution-id E2SGUMGGQ93Z3T --paths "/*"
# cp envs/.env.local .env

# Replace with your own configs, [aws-configs-profile-name], [bucket-name], [id]
