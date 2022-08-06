class RandomGenerator {
    MULTIPLIER_A = 1103515245; 
    INCREMENT_C = 12345; 
    MODULUS = 2147483647; 

    rnd = 1; 

    constructor() {}

    initRnd(seed, page) {
        this.rnd = seed * page + this.INCREMENT_C; 
    }

    randomInt() { 
        this.rnd = (this.rnd * this.MULTIPLIER_A + this.INCREMENT_C) % this.MODULUS; 
        return this.rnd; 
    }; 
    getRand(mod) { 
        var tmp = this.randomInt(); 
        if (tmp < 0) { 
            this.rnd = tmp * -1; 
        } 
        return this.rnd % mod; 
    }; 
}

const generator = new RandomGenerator();

exports.generator = generator;