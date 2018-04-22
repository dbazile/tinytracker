library 'deployment'

node {
    checkout scm

    withDockerContainer(image: 'node:9.2', args: '-e HOME=$WORKSPACE') {
        stage('Install dependencies') {
            sh 'yarn install'
        }

        stage('Test') {
            sh 'yarn test'
        }
    }

    stage('Deploy') {
        deployApplication('tinytracker')
    }
}
