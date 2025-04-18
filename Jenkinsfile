pipeline {
    agent any

    environment {
        IMAGE_NAME = 'nodejs-app'
        CONTAINER_NAME = 'nodejs-container'
        PORT = '8000'
        MONGO = credentials('mongo-uri-secret-id')
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/harsh-mahobia/BookStore.git'
            }
        }


        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('Deploy Container') {
            steps {
                sh """
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                 """
                 sh('docker run -d --name ${CONTAINER_NAME} -e MONGO=${MONGO} -p 80:${PORT} ${IMAGE_NAME}')
                   
               
            }
        }
    }

}
