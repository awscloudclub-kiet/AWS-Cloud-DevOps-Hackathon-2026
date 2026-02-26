1- Problem Statement

Implement a complete DevOps pipeline that automates the process from code commit to application deployment with minimal manual intervention.
The objective is to demonstrate containerization, consistent deployment, and rapid application updates using Docker.

The sample application used is a Number Guessing Game built with Node.js and Express.

2- Architecture Overview

Workflow:

i.Developer writes code (Node.js app)

ii.Code stored in GitHub repository

iii.Docker image is built using Dockerfile

iv. Docker container runs the application

v.Application is exposed on localhost:3000

vi.On code update → image rebuilt → container redeployed

Architecture Flow:

Developer → GitHub → Docker Build → Docker Image → Docker Container → Browser (User)

3- AWS Services Used

EC2 for hosting container, ECR for image storage, CodePipeline for CI/CD and IAM for secret keys.

4- Deployment Steps

i.Clone the repository
git clone <your-repo-link>
cd <project-folder>

ii.Build Docker image
docker build -t devops-app .

iii.Run Docker container
docker run -d -p 3000:3000 --name devops-container devops-app

iv.Access the application

Open browser:
http://localhost:3000

v.Redeployment after code change
docker build -t devops-app .
docker rm -f devops-container
docker run -d -p 3000:3000 --name devops-container devops-app

5-Security Considerations

Used official Node.js base image

Exposed only required port (3000)

Container isolation ensures environment consistency

No hardcoded secrets in code

.dockerignore used to exclude unnecessary files

6-Challenges Faced

Docker container name conflicts

Image removal errors due to running containers

Missing dependencies (Express not installed initially)

Understanding container lifecycle (stop → remove → run)

UI not updating due to old image cache

7-Key Learnings

Writing a Dockerfile for Node.js applications

Building and running Docker images and containers

Debugging container errors

Implementing redeployment workflow

Understanding DevOps lifecycle:
Code → Build → Deploy → Update → Redeploy

8-Demo Video Link

https://drive.google.com/file/d/1VEv2ETgND1N07KUSRN5n9mY0aORlGGYo/view?usp=sharing

9-Project Tech Stack

Node.js

Express.js

Docker

GitHub

AWS(EC2, IAM)