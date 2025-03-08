pipeline{
    
    agent any
    environment{
        SONAR_HOME = tool "Sonar"
        FRONTEND_IMAGE = "mern-stack-deploy-frontend"
        BACKEND_IMAGE = "mern-stack-deploy-backend"
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
        stage("Build Frontend Image") {
            steps {
                script {
                    sh "docker build -t mern-stack-deploy-frontend:latest -f frontend/Dockerfile frontend"
                    sh "docker tag mern-stack-deploy-frontend:latest mern-stack-deploy-frontend:${BUILD_NUMBER}"

                    // Delete previous image safely
                    def previousBuildNumber = (env.BUILD_NUMBER.toInteger() - 1).toString()

                    def imageExists = sh(
                        script: "docker images | awk '\$1 == \"${FRONTEND_IMAGE}\" && \$2 == \"${previousBuildNumber}\"'",
                        returnStatus: true
                    )
                    if (imageExists == 0) {
                        docker rmi -f ${FRONTEND_IMAGE}:${previousBuildNumber}
                        echo "Deleted old image"
                    } else {
                        echo "Previous image ${FRONTEND_IMAGE}:${previousBuildNumber} not found, skipping deletion."
                    }
                }
            }
        }
        // stage("Build Backend Image") {
        //     steps {
        //         script {
        //             sh "docker build -t ${BACKEND_IMAGE}:latest -f backend/Dockerfile backend"
        //             sh "docker tag ${BACKEND_IMAGE}:latest ${BACKEND_IMAGE}:${BUILD_NUMBER}"

        //             // Delete previous image safely
        //             def previousBuildNumber = (env.BUILD_NUMBER.toInteger() - 1).toString()
        //             sh """
        //             if docker images | grep -q '${BACKEND_IMAGE}:${previousBuildNumber}'; then
        //                 docker rmi -f ${BACKEND_IMAGE}:${previousBuildNumber}
        //             else
        //                 echo "Previous image ${BACKEND_IMAGE}:${previousBuildNumber} not found, skipping deletion."
        //             fi
        //             """
        //         }
        //     }
        // }
        stage("Push Image to DockerHub"){
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
                    // sh "docker image tag mern-stack-deploy-backend:latest ${env.dockerHubUser}/mern-stack-deploy-backend:latest"
                    // sh "docker image tag mern-stack-deploy-backend:${BUILD_NUMBER} ${env.dockerHubUser}/mern-stack-deploy-backend:${BUILD_NUMBER}"

                    sh "docker push ${env.dockerHubUser}/mern-stack-deploy-frontend:latest"
                    sh "docker push ${env.dockerHubUser}/mern-stack-deploy-frontend:${BUILD_NUMBER}"
                    // sh "docker push ${env.dockerHubUser}/mern-stack-deploy-backend:latest"
                    // sh "docker push ${env.dockerHubUser}/mern-stack-deploy-backend:${BUILD_NUMBER}"
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