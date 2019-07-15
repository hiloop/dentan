import store from '../store';

export interface IKanmusu {
    /** id */
    id: string;
    /** 艦名 */
    name: string;
    /** 読み方 */
    phonetic: string;
    /** 艦種 */
    shiptype: string;
    /** レベル */
    level: number;
    /** 改装設計図 */
    sekkeizu: number;
    /** 試製甲板カタパルト */
    catapult: number;
    /** 戦闘詳報 */
    sentoushouhou: number;
    /** 新型航空兵装資材 */
    koukushizai: number;
    /** 新型砲熕兵装資材 */
    houkoushizai: number;
    /** 開発資材 */
    kaihatsushizai: number;
    /** ステータス */
    status: number;
}

type KanmusuKey = keyof IKanmusu;

export default class Kanmusu implements IKanmusu {

    /**
     * StoreのデータをKanmusuに変換
     * @param storeData Storeから取得
     */
    public static convertStoreToKanmusu(storeData: any): Kanmusu {
        const kanmusu: Kanmusu = new Kanmusu();
        kanmusu.id = storeData.id;
        kanmusu.name = storeData.name;
        kanmusu.phonetic = storeData.phonetic;
        kanmusu.shiptype = storeData.shiptype;
        kanmusu.level = storeData.level;
        kanmusu.sekkeizu = storeData.sekkeizu;
        kanmusu.catapult = storeData.catapult;
        kanmusu.sentoushouhou = storeData.sentoushouhou;
        kanmusu.koukushizai = storeData.koukushizai;
        kanmusu.houkoushizai = storeData.houkoushizai;
        kanmusu.kaihatsushizai = storeData.kaihatsushizai;
        kanmusu.status = storeData.status;
        return kanmusu;
    }

    /**
     * IDから艦娘を取得
     * @param id 艦娘のPK
     */
    public static getKanmusuById(id: string): Kanmusu {
        const tmp = store.getters.getKanmusuById(id)[0];
        return this.convertStoreToKanmusu(tmp);
    }

    /**
     * ステータスから艦娘のリストを取得
     * @param status ステータス
     */
    public static getKanmusuListByStatus(status: number): Kanmusu[] {
        const result = store.getters.getKanmusuByStatus(status);
        const kanmusuArray: Kanmusu[] = [];
        result.forEach((entity: any) => {
            const kanmusu: Kanmusu = this.convertStoreToKanmusu(entity);
            kanmusuArray.push(kanmusu);
        });
        return kanmusuArray;
    }

    /**
     * ステータスの中でソートする。
     * @param status ステータス
     * @param key ソートする項目（Kanmusuのフィールド名を指定）。デフォルトはid。
     * @param isAsc true:昇順、false:降順。デフォルトはtrue。
     */
    public static getKanmusuListByStatusOrder(
        status: number, key: KanmusuKey = 'id', isAsc: boolean = true): Kanmusu[] {
        const result = store.getters.getKanmusuByStatus(status);
        let kanmusuArray: Kanmusu[] = [];
        result.forEach((entity: any) => {
            const kanmusu: Kanmusu = this.convertStoreToKanmusu(entity);
            kanmusuArray.push(kanmusu);
        });
        kanmusuArray = kanmusuArray.sort((a: Kanmusu, b: Kanmusu) => {
            if (key === 'id') {
                if (isAsc) {
                    return (a.id > b.id) ? 1 : -1;
                }
                return (a.id < b.id) ? 1 : -1;
            } else if (key === 'name') {
                if (isAsc) {
                    return (a.name > b.name) ? 1 : -1;
                }
                return (a.name < b.name) ? 1 : -1;
            } else if (key === 'phonetic') {
                if (isAsc) {
                    return (a.phonetic > b.phonetic) ? 1 : -1;
                }
                return (a.phonetic < b.phonetic) ? 1 : -1;
            } else if (key === 'level') {
                if (isAsc) {
                    return (a.level > b.level) ? 1 : -1;
                }
                return (a.level < b.level) ? 1 : -1;
            } else if (key === 'sekkeizu') {
                if (isAsc) {
                    return (a.sekkeizu > b.sekkeizu) ? 1 : -1;
                }
                return (a.sekkeizu < b.sekkeizu) ? 1 : -1;
            } else if (key === 'catapult') {
                if (isAsc) {
                    return (a.catapult > b.catapult) ? 1 : -1;
                }
                return (a.catapult < b.catapult) ? 1 : -1;
            } else if (key === 'sentoushouhou') {
                if (isAsc) {
                    return (a.sentoushouhou > b.sentoushouhou) ? 1 : -1;
                }
                return (a.sentoushouhou < b.sentoushouhou) ? 1 : -1;
            } else if (key === 'koukushizai') {
                if (isAsc) {
                    return (a.koukushizai > b.koukushizai) ? 1 : -1;
                }
                return (a.koukushizai < b.koukushizai) ? 1 : -1;
            } else if (key === 'houkoushizai') {
                if (isAsc) {
                    return (a.houkoushizai > b.houkoushizai) ? 1 : -1;
                }
                return (a.houkoushizai < b.houkoushizai) ? 1 : -1;
            } else if (key === 'kaihatsushizai') {
                if (isAsc) {
                    return (a.kaihatsushizai > b.kaihatsushizai) ? 1 : -1;
                }
                return (a.kaihatsushizai < b.kaihatsushizai) ? 1 : -1;
            } else {
                return 1;
            }
        });
        return kanmusuArray;
    }

    /**
     * 画面起動時の初期化。ステータスの取得、更新を行う。
     */
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

    /**
     * 未改造艦がいるかチェック
     */
    public static isExistUnRemodeled(): boolean {
        const all = this.getKanmusuListByStatus(1);
        return all.length !== 0;
    }

    private static readonly STORAGE_KEY: string = 'Kanmusu';

    /**
     * 現状の艦娘データをlocalstorageに保存
     */
    private static saveAllKanmusuToLocalStorage() {
        const all = this.getAll();
        const tmp = all.flatMap((value: any) => ({id: value.id, status: value.status}));
        localStorage.setItem(Kanmusu.STORAGE_KEY, JSON.stringify(tmp));
    }

    /**
     * 全件取得
     */
    private static getAll(): any {
        return store.state.kanmusu;
    }

    /* メンバー */
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

    /**
     * 艦娘をjsonに変換
     */
    public createStringForLocalStorage(): string {
        return JSON.stringify(this);
    }

    /**
     * ステータスを変更したら、storeとlocalstorageを更新
     * @param changedStatus 変更されたステータス
     */
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
