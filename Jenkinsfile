pipeline {
    agent any

    environment {
        IMAGE_NAME = 'nodejs-app'
        CONTAINER_NAME = 'nodejs-container'
        PORT = '5000'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/harsh-mahobia/BookStore.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
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
                    docker run -d --name ${CONTAINER_NAME} -p 80:${PORT} ${IMAGE_NAME}
                """
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
