const R = 6378137;

class Utility{
    static calculateDistance = (coordinate1, coordinate2) => {
        var dLat = Utility.degToRad(coordinate2.lat-coordinate1.lat);
        var dLon = Utility.degToRad(coordinate2.lng-coordinate1.lng);
        var lat1 = Utility.degToRad(coordinate1.lat);
        var lat2 = Utility.degToRad(coordinate2.lat);

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;
        return Math.round(d);
       
    }

    static  degToRad = (deg) => {
        return deg * Math.PI /180;
    }

}


export default Utility;