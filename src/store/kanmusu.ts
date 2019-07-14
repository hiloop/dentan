import store from '../store';

export interface IKanmusu {
    id: string;
    name: string;
    phonetic: string;
    shiptype: string;
    level: number;
    sekkeizu: number;
    catapult: number;
    sentoushouhou: number;
    koukushizai: number;
    houkoushizai: number;
    kaihatsushizai: number;
    status: number;
}

export default class Kanmusu implements IKanmusu {

    public static getKanmusuById(id: string): Kanmusu {
        const tmp = store.getters.getKanmusuById(id)[0];
        const kanmusu: Kanmusu = new Kanmusu();
        kanmusu.id = tmp.id;
        kanmusu.name = tmp.name;
        kanmusu.phonetic = tmp.phonetic;
        kanmusu.shiptype = tmp.shiptype;
        kanmusu.level = tmp.level;
        kanmusu.sekkeizu = tmp.sekkeizu;
        kanmusu.catapult = tmp.catapult;
        kanmusu.sentoushouhou = tmp.sentoushouhou;
        kanmusu.koukushizai = tmp.koukushizai;
        kanmusu.houkoushizai = tmp.houkoushizai;
        kanmusu.kaihatsushizai = tmp.kaihatsushizai;
        kanmusu.status = tmp.status;
        return kanmusu;
    }

    public static getKanmusuListByStatus(status: number): Kanmusu[] {
        const result = store.getters.getKanmusuByStatus(status);
        const kanmusuArray: Kanmusu[] = [];
        result.forEach((entity: any) => {
            const kanmusu: Kanmusu = new Kanmusu();
            kanmusu.id = entity.id;
            kanmusu.name = entity.name;
            kanmusu.phonetic = entity.phonetic;
            kanmusu.shiptype = entity.shiptype;
            kanmusu.level = entity.level;
            kanmusu.sekkeizu = entity.sekkeizu;
            kanmusu.catapult = entity.catapult;
            kanmusu.sentoushouhou = entity.sentoushouhou;
            kanmusu.koukushizai = entity.koukushizai;
            kanmusu.houkoushizai = entity.houkoushizai;
            kanmusu.kaihatsushizai = entity.kaihatsushizai;
            kanmusu.status = entity.status;
            kanmusuArray.push(kanmusu);
        });
        return kanmusuArray;
    }

    public static initKanmusu() {
        const json = localStorage.getItem(Kanmusu.STORAGE_KEY);
        if (!json) {
            Kanmusu.saveAllKanmusuToLocalStorage();
            return;
        }
        const inLocalStorage = JSON.parse(json);
        const all = this.getAll();
        const updatedStatus: any = inLocalStorage;
        // storeを更新
        for (const entity of all) {
            let isNew: boolean = false;
            for (const data of inLocalStorage) {
                if (data.id !== entity.id) {
                    isNew = true;
                    continue;
                }
                isNew = false;
                const args = { id: data.id, status: data.status };
                store.commit('changeStatus', args);
                break;
            }
            if (isNew) {
                const args = { id: entity.id, status: entity.status };
                updatedStatus.push(args);
            }
        }
        localStorage.setItem(Kanmusu.STORAGE_KEY, JSON.stringify(updatedStatus));
    }

    public static isExistUnRemodeled(): boolean {
        const all = this.getAll();
        return all.find((value: any) => (value.status === 1));
    }

    private static readonly STORAGE_KEY: string = 'Kanmusu';

    private static saveAllKanmusuToLocalStorage() {
        const all = this.getAll();
        const tmp = all.flatMap((value: any) => ({id: value.id, status: value.status}));
        localStorage.setItem(Kanmusu.STORAGE_KEY, JSON.stringify(tmp));
    }

    private static getAll(): any {
        return store.state.kanmusu;
    }

    public id!: string;
    public name!: string;
    public phonetic!: string;
    public shiptype!: string;
    public level!: number;
    public sekkeizu!: number;
    public catapult!: number;
    public sentoushouhou!: number;
    public koukushizai!: number;
    public houkoushizai!: number;
    public kaihatsushizai!: number;
    public status!: number;

    public storageFormat?: {
        id: string,
        status: string,
    };

    public createStringForLocalStorage(): string {
        return JSON.stringify(this);
    }

    public saveStatus(changedStatus: number) {
        // storeを更新
        const args = { id: this.id, status: changedStatus };
        store.commit('changeStatus', args);
        const json = localStorage.getItem(Kanmusu.STORAGE_KEY);
        if (!json) {
            return;
        }
        // Localstorageを更新
        const array = JSON.parse(json);
        for (const data of array) {
            if (data.id !== this.id) {
                continue;
            }
            data.status = changedStatus;
        }
        localStorage.setItem(Kanmusu.STORAGE_KEY, JSON.stringify(array));
    }
}
