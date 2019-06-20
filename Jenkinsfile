pipeline{
    agent any
    stages{
        stage('Merge'){
            steps{
                sh 'git checkout master'
                sh 'git pull'
                sh 'git checkout dev-test'
                sh 'git pull'
                sh 'git merge master'
                sh 'git push'
            }
        }

        stage('Build'){
            steps{
                sh 'yarn install'
                sh 'yarn build'
            }
        }

        stage('Deploy'){
            steps{
                sh 'rm -rf /home/publish/aqi-web'
                sh 'cp -rf dist /home/publish/aqi-web'
            }
        }
    }

    post{
        success{
            mail to: 'lusiyi@szboanda.net',
                    subject: "${currentBuild.fullDisplayName} - 通过",
                    body: "查看 ${env.BUILD_URL}"
        }
        failure{
            mail to: 'lusiyi@szboanda.net',
                    subject: "${currentBuild.fullDisplayName} - 失败",
                    body: "查看 ${env.BUILD_URL}"
        }
    }
}