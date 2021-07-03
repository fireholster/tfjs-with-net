
interface ITFService {
    checkConsole: any,
    getCarsData(): any

}

export class TFService  {
    
    checkConsole(): any {
        console.log("Inside TesortFlow Service");
    }


    async getCarsData() {

        const carsDataResponse = await fetch('https://storage.googleapis.com/tfjs-tutorials/carsData.json');
        const carsData = await carsDataResponse.json();
        const cleaned = carsData.map((car: { Miles_per_Gallon: any; Horsepower: any; }) => ({
            mpg: car.Miles_per_Gallon,
            horsepower: car.Horsepower,
        }))
            .filter((car: { mpg: null; horsepower: null; }) => (car.mpg != null && car.horsepower != null));

        return cleaned;
    }
}