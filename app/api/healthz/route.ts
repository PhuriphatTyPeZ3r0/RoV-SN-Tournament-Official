import { NextResponse } from 'next/server';

// K8s liveness/readiness probe target for the frontend Deployment
// (experiment/microservices-k8s, Phase 5). Deliberately touches nothing
// external — same reasoning as each service's own /healthz.
export async function GET() {
  return NextResponse.json({ status: 'ok', service: 'frontend' });
}
