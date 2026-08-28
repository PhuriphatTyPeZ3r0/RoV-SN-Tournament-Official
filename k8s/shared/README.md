# k8s/ manifests (experiment/microservices-k8s)

Raw YAML manifests only (no Helm/Kustomize for this phase). One subfolder per
component: `Deployment` + `Service` (ClusterIP) + that component's slice of the
`Ingress`, plus a `Secret` where the component needs Supabase credentials.

Single namespace (`default`) for now — no dev/uat/prod namespace split in this
exercise, that's a separate concern from the real `dev`/`uat`/`main` branch
environments used for production.

Images are built directly into minikube's Docker daemon:

```
minikube -p minikube docker-env | Invoke-Expression   # PowerShell
docker build -t analytics-svc:dev services/analytics-svc
```

then referenced in the Deployment with `imagePullPolicy: Never`.
