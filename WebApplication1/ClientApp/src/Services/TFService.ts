

export interface ITFService {
    checkConsole: any

}

class TFService implements ITFService {
    
    checkConsole(): any {
        console.log("Inside TesortFlow Service");
    }


}