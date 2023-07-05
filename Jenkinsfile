pipeline {
    options {
        timestamps()
    }
    parameters {
        string(name: 'BUILD_VERSION', defaultValue: '', description: 'The build version to deploy (optional)')
        string(name: 'ENVIRONMENT', defaultValue: 'ci', description: 'Role Name (mandatory)')
    }
    agent {
        label 'ncats && dpi && ci && pharos'
    }
    triggers {
        pollSCM('H/5 * * * *')
    }  
    environment {
        PROJECT_NAME     = "pharos"
        DOCKER_REPO_NAME = "registry.ncats.nih.gov:5000/pharos-frontend"
        INIT_TOKEN       = credentials('Vault-Access')                                   // OIDC provider this token is Auto Generated //
        SPHINX_TOKEN     = credentials('ncatssvcdvops-sphinx')                           // PatToken Read Only Access for the DevOps Artifacts Repo https://github.com/Sphinx-Automation/devops-pipeline-artifacts.git //
        ROLE_NAME        = "$ENVIRONMENT-$PROJECT_NAME"                                  // Role Name is Mandatory Variable for Vault //
        APP_TYPE         = "frontend"                                                         // Application Type is required to get Secret from Vault //
    }
    stages {
        stage('Docker/Apps getSecrets By Role') {
            steps {
                script {
                sh '''
                    ### Cloning the repo from DevOps Artifacts Repository Repo ###
                    git clone https://$SPHINX_TOKEN@github.com/Sphinx-Automation/devops-pipeline-artifacts.git
                    
                    ###  Running the script with Env specific to Authenticate Vault & Get Application Secrets for Docker Token###
                    cd devops-pipeline-artifacts/application
                    /bin/bash getNcatsDockerSecretsByRole.sh
                    /bin/bash getAppSecretsByRole.sh
                    '''
                }
            }
        }
        stage('Build Version') {
            when {
                expression {
                    return !params.BUILD_VERSION
                }
            }
            steps{
                script {
                    BUILD_VERSION_GENERATED = VersionNumber(
                        versionNumberString: 'v${BUILD_YEAR, XX}.${BUILD_MONTH, XX}${BUILD_DAY, XX}.${BUILDS_TODAY}',
                        projectStartDate:    '1970-01-01',
                        skipFailedBuilds:    true)
                    currentBuild.displayName = BUILD_VERSION_GENERATED
                    env.BUILD_VERSION = BUILD_VERSION_GENERATED
                    env.BUILD = 'true'
                }
            }
        }
        stage('Build') {
            when {
                expression {
                    return !params.BUILD_VERSION
                }
            }
            steps {
                configFileProvider([
                    configFile(fileId: 'environment.prod.ts', targetLocation: 'src/environments/environment.prod.ts'),
                    configFile(fileId: 'prepare.sh', targetLocation: 'prepare.sh')
                ]) {
                    withEnv([
                            "IMAGE_NAME=pharos-frontend",
                            "BUILD_VERSION=" + (params.BUILD_VERSION ?: env.BUILD_VERSION)
                        ]) {
                        script {
                        sh '''#!/bin/bash
                            chmod 774 src/environments/environment.prod.ts
                            source prepare.sh
                            docker login https://registry.ncats.nih.gov:5000 -u "${DOCKERLOGIN}" -p "${DOCKERPASSWORD}"
                            docker build --no-cache -f ./Dockerfile --build-arg BUILD_VERSION=${BUILD_VERSION} -t ${DOCKER_REPO_NAME} .
                            docker tag ${DOCKER_REPO_NAME}:latest ${DOCKER_REPO_NAME}:${BUILD_VERSION}
                            docker push ${DOCKER_REPO_NAME}:${BUILD_VERSION}
                            '''
                        }
                    }
                }
            }
        }
        stage('deploy docker') {
            steps {
                configFileProvider([
                   configFile(fileId: 'deploy.sh', targetLocation: 'deploy.sh')
                ]) {
                    sh  """  
                        /bin/bash deploy.sh
                        docker-compose -p $PROJECT_NAME-$APP_TYPE down -v --rmi all | xargs echo
                        docker pull $DOCKER_REPO_NAME:$BUILD_VERSION
                        docker rmi $DOCKER_REPO_NAME:current | xargs echo
                        docker tag $DOCKER_REPO_NAME:$BUILD_VERSION $DOCKER_REPO_NAME:current
                        docker-compose -p $PROJECT_NAME-$APP_TYPE up -d
                        docker start nginx-gen | xargs echo
                        docker rmi \$(docker images -aq) | xargs echo
                    """
                }
            }
            post {
               always {
                    echo " Clean up the workspace in deploy node!"
                    cleanWs()
                }
            }
        }
    }
}