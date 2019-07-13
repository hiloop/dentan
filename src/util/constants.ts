enum userStatus {
    unExists,
    unRemodeled,
    done,
}

enum ShipType {
    /** 駆逐艦 */
    destroyer = 'DD',
    /** 海防艦 */
    coastalDefenseShip = 'DE',
    /** 軽巡洋艦 */
    lightCruiser = 'CL',
    /** 練習巡洋艦 */
    trainingCruiser = 'CT',
    /** 重雷装巡洋艦 */
    torpedoCruiser = 'CLT',
    /** 重巡洋艦 */
    heavyCruiser = 'CA',
    /** 航空巡洋艦 */
    aviationCruiser = 'CAV',
    /** 戦艦 */
    battleship = 'BB',
    /** 航空戦艦 */
    aviationBattleship = 'BBV',
    /** 軽空母 */
    lightAircraftCarrier = 'CVL',
    /** 正規空母 */
    regularAircraftCarrier = 'CV',
    /** 装甲空母 */
    armoredAircraftCarrier = 'CVB',
    /** 潜水空母 */
    submarineAircraftCarrier = 'SSV',
    /** 潜水艦 */
    submarine = 'SS',
    /** 水上機母艦 */
    seaplaneTender  = 'AV',
    /** 潜水母艦 */
    submarineTender = 'AS',
    /** 揚陸艦 */
    amphibiousAssaultShip = 'LHA',
    /** 補給艦 */
    fleetOiler = 'AO',
    /** 工作艦 */
    repairShip  = 'AR',
}
