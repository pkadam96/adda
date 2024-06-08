class Booking {
    constructor(startTime, endTime) {
        this.startTime = startTime;
        this.endTime = endTime;
    }
}

class Facility {
    constructor(name, pricing) {
        this.name = name;
        this.pricing = pricing;
        this.bookings = [];
    }

    isAvailable(startTime, endTime) {
        for (let booking of this.bookings) {
            if (startTime < booking.endTime && endTime > booking.startTime) {
                return false;
            }
        }
        return true;
    }

    calculateCost(startTime, endTime) {
        let totalCost = 0;
        let currentTime = new Date(startTime);

        while (currentTime < endTime) {
            let hour = currentTime.getHours();
            if (this.name === "Clubhouse" || this.name === "clubhouse") {
                if (hour >= 10 && hour < 16) {
                    totalCost += this.pricing[0];
                } 
                else if (hour >= 16 && hour < 22) {
                    totalCost += this.pricing[1];
                }
            } 
            else if (this.name === "Tennis Court" || this.name === "tennis court" || this.name === "Tennis court") {
                totalCost += this.pricing[0];
            }

            currentTime.setHours(hour + 1);
        }

        return totalCost;
    }

    book(startTime, endTime) {
        if (this.isAvailable(startTime, endTime)) {
            this.bookings.push(new Booking(startTime, endTime));
            let cost = this.calculateCost(startTime, endTime);
            return `Booked, Rs. ${cost}`;
        } 
        else {
            return "Booking Failed, Already Booked";
        }
    }
}

class BookingSystem {
    constructor() {
        this.clubhouse = new Facility("Clubhouse", [100, 500]);
        this.tennisCourt = new Facility("Tennis Court", [50]);
    }

    bookFacility(facilityName, date, startTimeStr, endTimeStr) {
        let facility = facilityName === "Clubhouse" ? this.clubhouse : this.tennisCourt;

        let startTime = new Date(`${date} ${startTimeStr}`);
        let endTime = new Date(`${date} ${endTimeStr}`);

        if (startTime < new Date() || endTime < new Date()) {
            return "Error: Cannot book a time in the past.";
        }

        if (endTime < startTime) {
            return "Error: End time cannot be before start time.";
        }

        return facility.book(startTime, endTime);
    }
}

const bookingSystem = new BookingSystem();
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptUser() {
    readline.question("Enter the facility name (Clubhouse/Tennis Court) or type 'exit' to quit: ", facilityName => {
        if (facilityName.toLowerCase() === 'exit') {
            readline.close();
            return;
        }

        readline.question("Enter the date (dd-MM-yyyy): ", date => {
            readline.question("Enter the start time (HH:mm): ", startTime => {
                readline.question("Enter the end time (HH:mm): ", endTime => {
                    let result = bookingSystem.bookFacility(facilityName, date, startTime, endTime);
                    console.log(result);
                    promptUser();
                });
            });
        });
    });
}

promptUser();
