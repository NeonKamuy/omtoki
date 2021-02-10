import UserParticle from ".";

export default class ParticleCanvas {
    protected particles: UserParticle[] = [];

    constructor(protected readonly __body: HTMLBodyElement){
        this.initialiseCanvas();    
    }

    public static handleDocumentLoaded() {
        const body = document.getElementsByTagName("body")[0];
        const canvas = new ParticleCanvas(body);
    }

    private initialiseCanvas() {}    
}