library 'deployment'

pipeline {
    agent {
        docker image: 'node:9.1', args: '-u root'  // bar
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

//      stage('Deploy') {
//          steps {
//              deployApplication('tinytracker')
//          }
//      }
    }
}
