parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"
cd ../frontend

npm run build:prod
scp -r ./dist/musical-analysis-frontend/* root@heffter.net:/var/www/molle.heffter.net/public_html/