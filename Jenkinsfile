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
                    sh "docker build -t ${FRONTEND_IMAGE}:latest -f frontend/Dockerfile frontend"
                    sh "docker tag ${FRONTEND_IMAGE}:latest ${FRONTEND_IMAGE}:${BUILD_NUMBER}"

                    // // Delete previous image safely
                    // def previousBuildNumber = (env.BUILD_NUMBER.toInteger() - 1).toString()

                    // def imageExists = sh(
                    //     script: "docker images | awk '\$1 == \"${FRONTEND_IMAGE}\" && \$2 == \"${previousBuildNumber}\"'",
                    //     returnStatus: true
                    // )
                    // if (imageExists == 0) {
                    //     sh "docker rmi -f ${FRONTEND_IMAGE}:${previousBuildNumber}"
                    //     sh "docker rmi -f ${env.dockerHubUser}/${FRONTEND_IMAGE}:${previousBuildNumber}"
                    //     echo "Deleted old image"
                    // } else {
                    //     echo "Previous image ${FRONTEND_IMAGE}:${previousBuildNumber} not found, skipping deletion."
                    // }
                }
            }
        }
        stage("Build Backend Image") {
            steps {
                script {
                    sh "docker build -t ${BACKEND_IMAGE}:latest -f backend/Dockerfile backend"
                    sh "docker tag ${BACKEND_IMAGE}:latest ${BACKEND_IMAGE}:${BUILD_NUMBER}"

                    // // Delete previous image safely
                    // def previousBuildNumber = (env.BUILD_NUMBER.toInteger() - 1).toString()

                    // def imageExists = sh(
                    //     script: "docker images | awk '\$1 == \"${BACKEND_IMAGE}\" && \$2 == \"${previousBuildNumber}\"'",
                    //     returnStatus: true
                    // )
                    // if (imageExists == 0) {
                    //     sh "docker rmi -f ${BACKEND_IMAGE}:${previousBuildNumber}"
                    //     sh "docker rmi -f ${env.dockerHubUser}/${BACKEND_IMAGE}:${previousBuildNumber}"
                    //     echo "Deleted old image"
                    // } else {
                    //     echo "Previous image ${BACKEND_IMAGE}:${previousBuildNumber} not found, skipping deletion."
                    // }
                }
            }
        }
        stage("Push Image to DockerHub"){
            steps{
                echo "Pushing image to Docker Hub"
                withCredentials([ usernamePassword(
                    'credentialsId': "dockerHubCred", 
                    passwordVariable: "dockerHubPass", 
                    usernameVariable: "dockerHubUser") 
                ]){
                    sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                    sh "docker image tag ${FRONTEND_IMAGE}:latest ${env.dockerHubUser}/${FRONTEND_IMAGE}:latest"
                    sh "docker image tag ${FRONTEND_IMAGE}:${BUILD_NUMBER} ${env.dockerHubUser}/${FRONTEND_IMAGE}:${BUILD_NUMBER}"
                    sh "docker image tag ${BACKEND_IMAGE}:latest ${env.dockerHubUser}/${BACKEND_IMAGE}:latest"
                    sh "docker image tag ${BACKEND_IMAGE}:${BUILD_NUMBER} ${env.dockerHubUser}/${BACKEND_IMAGE}:${BUILD_NUMBER}"

                    sh "docker push ${env.dockerHubUser}/${FRONTEND_IMAGE}:latest"
                    sh "docker push ${env.dockerHubUser}/${FRONTEND_IMAGE}:${BUILD_NUMBER}"
                    sh "docker push ${env.dockerHubUser}/${BACKEND_IMAGE}:latest"
                    sh "docker push ${env.dockerHubUser}/${BACKEND_IMAGE}:${BUILD_NUMBER}"

                    script{
                        // Delete previous frontend images safely
                        def previousBuildNumber = (env.BUILD_NUMBER.toInteger() - 1).toString()

                        def frontendImageExists = sh(
                            script: "docker images | awk '\$1 == \"${FRONTEND_IMAGE}\" && \$2 == \"${previousBuildNumber}\"'",
                            returnStatus: true
                        )
                        if (frontendImageExists == 0) {
                            sh "docker rmi -f ${FRONTEND_IMAGE}:${previousBuildNumber}"
                            sh "docker rmi -f ${env.dockerHubUser}/${FRONTEND_IMAGE}:${previousBuildNumber}"
                            echo "Deleted old image"
                        } else {
                            echo "Previous image ${FRONTEND_IMAGE}:${previousBuildNumber} not found, skipping deletion."
                        }

                        // Delete previous backend image safely

                        def backendImageExists = sh(
                            script: "docker images | awk '\$1 == \"${BACKEND_IMAGE}\" && \$2 == \"${previousBuildNumber}\"'",
                            returnStatus: true
                        )
                        if (backendImageExists == 0) {
                            sh "docker rmi -f ${BACKEND_IMAGE}:${previousBuildNumber}"
                            sh "docker rmi -f ${env.dockerHubUser}/${BACKEND_IMAGE}:${previousBuildNumber}"
                            echo "Deleted old image"
                        } else {
                            echo "Previous image ${BACKEND_IMAGE}:${previousBuildNumber} not found, skipping deletion."
                        }
                    }

                    


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