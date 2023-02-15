const helperInfraccion = {}

helperInfraccion.definicionInfraccion = (num) =>{
    switch(num){
        case '':
            return 'sin motivo';
        case '0.1':
            return 'Otros'
        case '1.1':
            return 'El vehículo está sucio';
        case '1.2':
            return 'Vestimenta inapropiada';
        case '2.1':
            return 'No quiere dar el recibo';
        case '2.2':
            return 'Conducción temeraria';
        case '2.3':
            return 'Encochar a menos de 50m de parada'
        case '3.1':
            return 'Me está cobrando de más';
        case '3.2':
            return 'Está pactando precio al alza'
        case '3.3':
            return 'Está estafando a un cliente';
        case '3.4':
            return 'Usando tarifa 3 sín identificación';
        default:
            return 'error'
    }
}

module.exports = helperInfraccion