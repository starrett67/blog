pipeline{
    environment {
        DEPLOY_BUCKET = credentials('DEPLOY_BUCKET')
        STRAPI_USER = credentials('STRAPI_USER')
        STRAPI_PASSWORD = credentials('STRAPI_PASSWORD')
    }
    agent{
        agent {
            docker { image 'node:dubnium' }
        }
    }
    stages{
        stage("build"){
            steps {
                sh 'npm run build'
            }
        }
        stage("deploy") {
            steps {
                sh "aws s3 cp public s3://${DEPLOY_BUCKET}"
            }
        }
    }
    post{
        always{
            deleteWs()
        }
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}