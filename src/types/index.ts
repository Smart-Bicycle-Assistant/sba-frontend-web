// Record
<<<<<<< HEAD
export type RecordListType = {
=======
export type RecordComponentType = {
>>>>>>> 62e5acc (:sparkles: Add BicycleDetail & BicycleRegistraion Page)
  avgSpeed: number;
  recordId: number;
  ridingDistance: number;
  ridingDuration: number;
  ridingTime: number;
};

<<<<<<< HEAD
export type RecordComponentType = RecordListType & {
  id: number;
  memberId: string;
  bicycleNo: number;
  distance: number;
  maxSpeed: number;
  map: string;
=======
//Bicycle
export type BicycleCardProps = {
  name: string;
  registrationDate: string;
  mileage: string;
>>>>>>> 62e5acc (:sparkles: Add BicycleDetail & BicycleRegistraion Page)
};
