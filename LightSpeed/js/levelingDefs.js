var levelingDefs = [
    { need: 100, health: 100, speed: 1, damage: 25 }, { need: 250, health: 205, speed: 1, damage: 26 }, {
        need: 450,
        health: 315,
        speed: 1,
        damage: 28
    }, { need: 700, health: 430, speed: 1, damage: 31 }, {
        need: 1000,
        health: 550,
        speed: 1,
        damage: 35
    }, { need: 1350, health: 675, speed: 1.1, damage: 40 }, {
        need: 1750,
        health: 805,
        speed: 1.1,
        damage: 46
    }, { need: 2200, health: 940, speed: 1.1, damage: 53 }, {
        need: 2700,
        health: 1080,
        speed: 1.1,
        damage: 61
    }, { need: 3250, health: 1225, speed: 1.1, damage: 70 }, {
        need: 3850,
        health: 1375,
        speed: 1.2000000000000002,
        damage: 80
    }, { need: 4500, health: 1530, speed: 1.2000000000000002, damage: 91 }, {
        need: 5200,
        health: 1690,
        speed: 1.2000000000000002,
        damage: 103
    }, { need: 5950, health: 1855, speed: 1.2000000000000002, damage: 116 }, {
        need: 6750,
        health: 2025,
        speed: 1.2000000000000002,
        damage: 130
    }, { need: 7600, health: 2200, speed: 1.3000000000000003, damage: 145 }, {
        need: 8500,
        health: 2380,
        speed: 1.3000000000000003,
        damage: 161
    }, { need: 9450, health: 2565, speed: 1.3000000000000003, damage: 178 }, {
        need: 10450,
        health: 2755,
        speed: 1.3000000000000003,
        damage: 196
    }, { need: 11500, health: 2950, speed: 1.3000000000000003, damage: 215 }, {
        need: 12600,
        health: 3150,
        speed: 1.4000000000000004,
        damage: 235
    }, { need: 13750, health: 3355, speed: 1.4000000000000004, damage: 256 }, {
        need: 14950,
        health: 3565,
        speed: 1.4000000000000004,
        damage: 278
    }, { need: 16200, health: 3780, speed: 1.4000000000000004, damage: 301 }, {
        need: 17500,
        health: 4000,
        speed: 1.4000000000000004,
        damage: 325
    }, { need: 18850, health: 4225, speed: 1.5000000000000004, damage: 350 }, {
        need: 20250,
        health: 4455,
        speed: 1.5000000000000004,
        damage: 376
    }, { need: 21700, health: 4690, speed: 1.5000000000000004, damage: 403 }, {
        need: 23200,
        health: 4930,
        speed: 1.5000000000000004,
        damage: 431
    }, { need: 24750, health: 5175, speed: 1.5000000000000004, damage: 460 }, {
        need: 26350,
        health: 5425,
        speed: 1.6000000000000005,
        damage: 490
    }, { need: 28000, health: 5680, speed: 1.6000000000000005, damage: 521 }, {
        need: 29700,
        health: 5940,
        speed: 1.6000000000000005,
        damage: 553
    }, { need: 31450, health: 6205, speed: 1.6000000000000005, damage: 586 }, {
        need: 33250,
        health: 6475,
        speed: 1.6000000000000005,
        damage: 620
    }, { need: 35100, health: 6750, speed: 1.7000000000000006, damage: 655 }, {
        need: 37000,
        health: 7030,
        speed: 1.7000000000000006,
        damage: 691
    }, { need: 38950, health: 7315, speed: 1.7000000000000006, damage: 728 }, {
        need: 40950,
        health: 7605,
        speed: 1.7000000000000006,
        damage: 766
    }, { need: 43000, health: 7900, speed: 1.7000000000000006, damage: 805 }, {
        need: 45100,
        health: 8200,
        speed: 1.8000000000000007,
        damage: 845
    }, { need: 47250, health: 8505, speed: 1.8000000000000007, damage: 886 }, {
        need: 49450,
        health: 8815,
        speed: 1.8000000000000007,
        damage: 928
    }, { need: 51700, health: 9130, speed: 1.8000000000000007, damage: 971 }, {
        need: 54000,
        health: 9450,
        speed: 1.8000000000000007,
        damage: 1015
    }, { need: 56350, health: 9775, speed: 1.9000000000000008, damage: 1060 }, {
        need: 58750,
        health: 10105,
        speed: 1.9000000000000008,
        damage: 1106
    }, { need: 61200, health: 10440, speed: 1.9000000000000008, damage: 1153 }, {
        need: 63700,
        health: 10780,
        speed: 1.9000000000000008,
        damage: 1201
    }, { need: 66250, health: 11125, speed: 1.9000000000000008, damage: 1250 }, {
        need: 68850,
        health: 11475,
        speed: 2.000000000000001,
        damage: 1300
    }, { need: 71500, health: 11830, speed: 2.000000000000001, damage: 1351 }, {
        need: 74200,
        health: 12190,
        speed: 2.000000000000001,
        damage: 1403
    }, { need: 76950, health: 12555, speed: 2.000000000000001, damage: 1456 }, {
        need: 79750,
        health: 12925,
        speed: 2.000000000000001,
        damage: 1510
    }, { need: 82600, health: 13300, speed: 2.100000000000001, damage: 1565 }, {
        need: 85500,
        health: 13680,
        speed: 2.100000000000001,
        damage: 1621
    }, { need: 88450, health: 14065, speed: 2.100000000000001, damage: 1678 }, {
        need: 91450,
        health: 14455,
        speed: 2.100000000000001,
        damage: 1736
    }, { need: 94500, health: 14850, speed: 2.100000000000001, damage: 1795 }, {
        need: 97600,
        health: 15250,
        speed: 2.200000000000001,
        damage: 1855
    }, { need: 100750, health: 15655, speed: 2.200000000000001, damage: 1916 }, {
        need: 103950,
        health: 16065,
        speed: 2.200000000000001,
        damage: 1978
    }, { need: 107200, health: 16480, speed: 2.200000000000001, damage: 2041 }, {
        need: 110500,
        health: 16900,
        speed: 2.200000000000001,
        damage: 2105
    }, { need: 113850, health: 17325, speed: 2.300000000000001, damage: 2170 }, {
        need: 117250,
        health: 17755,
        speed: 2.300000000000001,
        damage: 2236
    }, { need: 120700, health: 18190, speed: 2.300000000000001, damage: 2303 }, {
        need: 124200,
        health: 18630,
        speed: 2.300000000000001,
        damage: 2371
    }, { need: 127750, health: 19075, speed: 2.300000000000001, damage: 2440 }, {
        need: 131350,
        health: 19525,
        speed: 2.4000000000000012,
        damage: 2510
    }, { need: 135000, health: 19980, speed: 2.4000000000000012, damage: 2581 }, {
        need: 138700,
        health: 20440,
        speed: 2.4000000000000012,
        damage: 2653
    }, { need: 142450, health: 20905, speed: 2.4000000000000012, damage: 2726 }, {
        need: 146250,
        health: 21375,
        speed: 2.4000000000000012,
        damage: 2800
    }, { need: 150100, health: 21850, speed: 2.5000000000000013, damage: 2875 }, {
        need: 154000,
        health: 22330,
        speed: 2.5000000000000013,
        damage: 2951
    }, { need: 157950, health: 22815, speed: 2.5000000000000013, damage: 3028 }, {
        need: 161950,
        health: 23305,
        speed: 2.5000000000000013,
        damage: 3106
    }, { need: 166000, health: 23800, speed: 2.5000000000000013, damage: 3185 }, {
        need: 170100,
        health: 24300,
        speed: 2.6000000000000014,
        damage: 3265
    }, { need: 174250, health: 24805, speed: 2.6000000000000014, damage: 3346 }, {
        need: 178450,
        health: 25315,
        speed: 2.6000000000000014,
        damage: 3428
    }, { need: 182700, health: 25830, speed: 2.6000000000000014, damage: 3511 }, {
        need: 187000,
        health: 26350,
        speed: 2.6000000000000014,
        damage: 3595
    }, { need: 191350, health: 26875, speed: 2.7000000000000015, damage: 3680 }, {
        need: 195750,
        health: 27405,
        speed: 2.7000000000000015,
        damage: 3766
    }, { need: 200200, health: 27940, speed: 2.7000000000000015, damage: 3853 }, {
        need: 204700,
        health: 28480,
        speed: 2.7000000000000015,
        damage: 3941
    }, { need: 209250, health: 29025, speed: 2.7000000000000015, damage: 4030 }, {
        need: 213850,
        health: 29575,
        speed: 2.8000000000000016,
        damage: 4120
    }, { need: 218500, health: 30130, speed: 2.8000000000000016, damage: 4211 }, {
        need: 223200,
        health: 30690,
        speed: 2.8000000000000016,
        damage: 4303
    }, { need: 227950, health: 31255, speed: 2.8000000000000016, damage: 4396 }, {
        need: 232750,
        health: 31825,
        speed: 2.8000000000000016,
        damage: 4490
    }, { need: 237600, health: 32400, speed: 2.9000000000000017, damage: 4585 }, {
        need: 242500,
        health: 32980,
        speed: 2.9000000000000017,
        damage: 4681
    }, { need: 247450, health: 33565, speed: 2.9000000000000017, damage: 4778 }, {
        need: 252450,
        health: 34155,
        speed: 2.9000000000000017,
        damage: 4876
    }, { need: 257500, health: 34750, speed: 2.9000000000000017, damage: 4975 }, {
        need: 262600,
        health: 35350,
        speed: 3.0000000000000018,
        damage: 5075
    }, { need: 267750, health: 35955, speed: 3.0000000000000018, damage: 5176 }, {
        need: 272950,
        health: 36565,
        speed: 3.0000000000000018,
        damage: 5278
    }, { need: 278200, health: 37180, speed: 3.0000000000000018, damage: 5381 }, {
        need: 283500,
        health: 37800,
        speed: 3.0000000000000018,
        damage: 5485
    }, { need: 288850, health: 38425, speed: 3.100000000000002, damage: 5590 }, {
        need: 294250,
        health: 39055,
        speed: 3.100000000000002,
        damage: 5696
    }, { need: 299700, health: 39690, speed: 3.100000000000002, damage: 5803 }, {
        need: 305200,
        health: 40330,
        speed: 3.100000000000002,
        damage: 5911
    }, { need: 310750, health: 40975, speed: 3.100000000000002, damage: 6020 }, {
        need: 316350,
        health: 41625,
        speed: 3.200000000000002,
        damage: 6130
    }, { need: 322000, health: 42280, speed: 3.200000000000002, damage: 6241 }, {
        need: 327700,
        health: 42940,
        speed: 3.200000000000002,
        damage: 6353
    }, { need: 333450, health: 43605, speed: 3.200000000000002, damage: 6466 }, {
        need: 339250,
        health: 44275,
        speed: 3.200000000000002,
        damage: 6580
    }, { need: 345100, health: 44950, speed: 3.300000000000002, damage: 6695 }, {
        need: 351000,
        health: 45630,
        speed: 3.300000000000002,
        damage: 6811
    }, { need: 356950, health: 46315, speed: 3.300000000000002, damage: 6928 }, {
        need: 362950,
        health: 47005,
        speed: 3.300000000000002,
        damage: 7046
    }, { need: 369000, health: 47700, speed: 3.300000000000002, damage: 7165 }, {
        need: 375100,
        health: 48400,
        speed: 3.400000000000002,
        damage: 7285
    }, { need: 381250, health: 49105, speed: 3.400000000000002, damage: 7406 }, {
        need: 387450,
        health: 49815,
        speed: 3.400000000000002,
        damage: 7528
    }, { need: 393700, health: 50530, speed: 3.400000000000002, damage: 7651 }, {
        need: 400000,
        health: 51250,
        speed: 3.400000000000002,
        damage: 7775
    }, { need: 406350, health: 51975, speed: 3.500000000000002, damage: 7900 }, {
        need: 412750,
        health: 52705,
        speed: 3.500000000000002,
        damage: 8026
    }, { need: 419200, health: 53440, speed: 3.500000000000002, damage: 8153 }, {
        need: 425700,
        health: 54180,
        speed: 3.500000000000002,
        damage: 8281
    }, { need: 432250, health: 54925, speed: 3.500000000000002, damage: 8410 }, {
        need: 438850,
        health: 55675,
        speed: 3.6000000000000023,
        damage: 8540
    }, { need: 445500, health: 56430, speed: 3.6000000000000023, damage: 8671 }, {
        need: 452200,
        health: 57190,
        speed: 3.6000000000000023,
        damage: 8803
    }, { need: 458950, health: 57955, speed: 3.6000000000000023, damage: 8936 }, {
        need: 465750,
        health: 58725,
        speed: 3.6000000000000023,
        damage: 9070
    }, { need: 472600, health: 59500, speed: 3.7000000000000024, damage: 9205 }, {
        need: 479500,
        health: 60280,
        speed: 3.7000000000000024,
        damage: 9341
    }, { need: 486450, health: 61065, speed: 3.7000000000000024, damage: 9478 }, {
        need: 493450,
        health: 61855,
        speed: 3.7000000000000024,
        damage: 9616
    }, { need: 500500, health: 62650, speed: 3.7000000000000024, damage: 9755 }, {
        need: 507600,
        health: 63450,
        speed: 3.8000000000000025,
        damage: 9895
    }, { need: 514750, health: 64255, speed: 3.8000000000000025, damage: 10036 }, {
        need: 521950,
        health: 65065,
        speed: 3.8000000000000025,
        damage: 10178
    }, { need: 529200, health: 65880, speed: 3.8000000000000025, damage: 10321 }, {
        need: 536500,
        health: 66700,
        speed: 3.8000000000000025,
        damage: 10465
    }, { need: 543850, health: 67525, speed: 3.9000000000000026, damage: 10610 }, {
        need: 551250,
        health: 68355,
        speed: 3.9000000000000026,
        damage: 10756
    }, { need: 558700, health: 69190, speed: 3.9000000000000026, damage: 10903 }, {
        need: 566200,
        health: 70030,
        speed: 3.9000000000000026,
        damage: 11051
    }, { need: 573750, health: 70875, speed: 3.9000000000000026, damage: 11200 }, {
        need: 581350,
        health: 71725,
        speed: 4.000000000000003,
        damage: 11350
    }

];