library 'deployment'

pipeline {
    agent {
        docker {
            image 'node:9.1'
            args '-e HOME=.'
        }
    }

    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }

        stage('Deploy') {
            steps {
                deployApplication('tinytracker')
            }
        }
    }
}
