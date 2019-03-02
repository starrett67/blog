pipeline{
    environment {
        DEPLOY_BUCKET = credentials('DEPLOY_BUCKET')
        STRAPI_USER = credentials('STRAPI_USER')
        STRAPI_PASSWORD = credentials('STRAPI_PASSWORD')
    }
    agent any
    stages{
        stage("build"){
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage("deploy") {
            when {
                branch 'master'
            }
            steps {
                sh "aws s3 sync public s3://${DEPLOY_BUCKET} --delete"
            }
        }
    }
    post{
        always{
            cleanWs()
        }
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}