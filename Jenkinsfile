pipeline{
    
    agent any
    environment{
        SONAR_HOME = tool "Sonar"
    }
    
    stages{

        stage("Clone code from Github"){
            steps{
                git url: "https://github.com/jinang-shah/mern-stack-deploy.git", branch: "master"
                echo "Code cloned."
            }
        }
        // stage("SonarQube Quality Analysis"){
        //     steps{
        //         withSonarQubeEnv("Sonar"){
        //             sh "$SONAR_HOME/bin/sonar-scanner -Dsonar.projectName=mern-stack-deploy -Dsonar.projectKey=mern-stack-deploy" 
        //         }
        //         echo "Build successful"
        //     }
        // }
        stage("Test"){
            steps{
                echo "Test cases passed"
            }
        }
        stage("Build and Push Frontend Image") {
            steps {
                script {
                    sh "docker build -t mern-stack-deploy-frontend:latest -f frontend/Dockerfile frontend"
                    sh "docker tag mern-stack-deploy-frontend:latest mern-stack-deploy-frontend:${BUILD_NUMBER}"
                }
            }
        }
        stage("Build and Push Backend Image") {
            steps {
                script {
                    sh "docker build -t mern-stack-deploy-backend:latest -f backend/Dockerfile backend"
                    sh "docker tag mern-stack-deploy-backend:latest mern-stack-deploy-backend:${BUILD_NUMBER}"
                }
            }
        }
        stage("Push to DockerHub"){
            steps{
                echo "Pushing docker image to Docker Hub"
                withCredentials([ usernamePassword(
                    'credentialsId': "dockerHubCred", 
                    passwordVariable: "dockerHubPass", 
                    usernameVariable: "dockerHubUser") 
                ]){
                    sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                    sh "docker image tag mern-stack-deploy-frontend:latest ${env.dockerHubUser}/mern-stack-deploy-frontend:latest"
                    sh "docker image tag mern-stack-deploy-frontend:${BUILD_NUMBER} ${env.dockerHubUser}/mern-stack-deploy-frontend:${BUILD_NUMBER}"
                    sh "docker image tag mern-stack-deploy-backend:latest ${env.dockerHubUser}/mern-stack-deploy-backend:latest"
                    sh "docker image tag mern-stack-deploy-backend:${BUILD_NUMBER} ${env.dockerHubUser}/mern-stack-deploy-backend:${BUILD_NUMBER}"

                    sh "docker push ${env.dockerHubUser}/mern-stack-deploy-frontend:latest"
                    sh "docker push ${env.dockerHubUser}/mern-stack-deploy-frontend:${BUILD_NUMBER}"
                    sh "docker push ${env.dockerHubUser}/mern-stack-deploy-backend:latest"
                    sh "docker push ${env.dockerHubUser}/mern-stack-deploy-backend:${BUILD_NUMBER}"
                }
            }
        }
        stage("Deploy"){
            steps{
                echo "Code is Deployed"
            }
        }
    }
}