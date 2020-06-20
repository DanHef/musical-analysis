parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"
cd ../frontend

npm run build:prod

cd ../frontend-client

npm run build:prod

scp -r ../frontend/dist/musical-analysis-frontend/* root@heffter.net:/var/www/musical-analysis.moderator.heffter.net/public_html/
scp -r ./dist/frontend-client/* root@heffter.net:/var/www/musical-analysis.heffter.net/public_html/