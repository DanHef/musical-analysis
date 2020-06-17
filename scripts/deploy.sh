parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"

npm run build:prod
scp -r ../frontend/dist/musical-analysis-frontend/* root@heffter.net:/var/www/molle.heffter.net/public_html/