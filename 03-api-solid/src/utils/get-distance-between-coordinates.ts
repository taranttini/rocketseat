import { Decimal } from "@prisma/client/runtime/library";

export interface Coordinate {
  latitude: number;
  longitude: number;
}

// regra de calculo naval de distancia entre dois pontos de latitude e longitude
export function getDistanceBetweenCoordinates(
  from: Coordinate,
  to: Coordinate,
) {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0;
  }

  const fromRadian = (Math.PI * from.latitude) / 180;
  const toRadian = (Math.PI * to.latitude) / 180;

  const theta = from.longitude - to.longitude;
  const radTheta = (Math.PI * theta) / 180;

  let dist =
    Math.sin(fromRadian) * Math.sin(toRadian) +
    Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta);

  if (dist > 1) {
    dist = 1;
  }

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344;

  return dist;
}

export function getDistanceBetweenCoordinates2(
  from: Coordinate,
  to: Coordinate,
) {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0;
  }

  const toRadian = (value: number): number => {
    return (Math.PI * value) / 180;
  };

  const fromRadians = toRadian(from.latitude);
  const toRadians = toRadian(to.latitude);

  const theta = to.longitude - from.longitude;
  const thetaRadians = toRadian(theta);

  let dist =
    Math.sin(fromRadians) * Math.sin(toRadians) +
    Math.cos(fromRadians) * Math.cos(toRadians) * Math.cos(thetaRadians);

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344; // earthRadius

  return dist;
}
// 0.5500262395798152 1.0810565565442256
