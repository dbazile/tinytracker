pipeline {
    agent any

    tools {
        nodejs 'nodejs_8'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'git://github.com/dbazile/tinytracker'
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
