Programm system for of checking accessibility web interfaces
1. Preprocessing for build project
Clone repo
git clone git@github.com:Ravino/ide-accessibility-backend.git
cd new cloned project
git checkout dev
git pull origin dev

Your mast entry values for enviroament  in .env file on of example .env.example file
cp .env.example .env
nano .env
Your mast create Dockerfile on example Dockerfile.example
cp Dockerfile.example Dockerfile
Your mast create docker-compose.yml on example docker-compose.yml.example
cp docker-compose.yml.example docker-compose.yml
Right now, all post of steps, your can build project
docker-compose up -d --build
Please awating process, docker service up build project
Post build success your can see success build on evry item success build

