# Deploy a Kubernetes Deployment Running nodeapp
kubectl create deployment nodeapp --image=dyvantage01/nodeapp --replicas=3 --port=81

NOTE: the deployment will create a ReplicaSet )behind the scenes)

# Create a Service (to access port 81 on the pods)
kubectl expose deployment nodeapp --port=3000 --target-port=81 --type=LoadBalancer

# Get External IP/Port (to access nodeapp)
kc get service

# Validate Nodeapp is accessible from outside the cluster
curl a3710d95dbc6c4201bf41e7ca8ae1e9a-1856955607.us-east-1.elb.amazonaws.com:3000

NOTE: it can take a few minutes for DNS to propogate the EXTERAL-IP address

# Scale-Up Nodeapp
kubectl scale deployments/nodeapp --replicas=4

# Update Nodeapp (Rolling Update)
1. To initiate a rolling upgrade, update image version for the deployment definition:
kubectl set image deployments/nodeapp nodeapp=dyvantage01/nodeapp:1.0.1

2. To monitor:
kc rollout status deployments/nodeapp

3. When the rollout is complete, do a `kubectl get pods` and you'll a new set of pods.
