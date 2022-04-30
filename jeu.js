phase = 'demarrage';

joueurs = NaN;
tour = 1;
mur_choisi = NaN;
sens_mur = 0;
murs_libres = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
murs = [['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
        ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
        ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
        ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
        ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
        ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
        ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
        ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
        ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
        ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a']]
pions = [[0, 0, 0, 0, 2, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0, 0, 0],
         [1, 0, 0, 0, 0, 0, 0, 0, 3],
         [0, 0, 0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 4, 0, 0, 0, 0]]

function choix(action, c) {
    if (action == 'emplacement' && phase == 'construction') {
        
        // Déplacement du mur sur la case choisie :
        var reussi = false;
        if (sens_mur % 180 == 0 && murs[c.y][c.x] == 'a' && murs[c.y][c.x - 1] != 'h' && murs[c.y][c.x + 1] != 'h') {
            murs[c.y][c.x] = 'h';
            document.getElementById(`mur-${mur_choisi}`).style.transform = `translate(${c.x * 60}px, ${c.y * 60}px) rotate(${sens_mur}deg)`

            reussi = true;
        } else if (sens_mur % 180 == 90 && murs[c.y][c.x] == 'a' && murs[c.y - 1][c.x] != 'v' && murs[c.y + 1][c.x] != 'v') {
            murs[c.y][c.x] = 'v';
            document.getElementById(`mur-${mur_choisi}`).style.transform = `translate(${c.x * 60}px, ${c.y * 60}px) rotate(${sens_mur}deg)`

            reussi = true;
        }
        if (reussi) {
            document.getElementById('murs').style.display = 'none';
            document.getElementById('tourner').style.display = 'none';
    
            ++tour;
            sens_mur = 0;
            mur_choisi = NaN;
            phase = 'deplacement';
        }

    } else if (action == 'mur' && phase == 'deplacement' && c % joueurs == tour % joueurs && murs_libres[c % 20]) {

        // Choix d'un mur :
        document.getElementById(`mur-${c}`).style.transform = 'translate(270px, 600px)';
        murs_libres[c % 20] = false;
        mur_choisi = c;

        document.getElementById('murs').style.display = 'block';
        document.getElementById('tourner').style.display = 'block';
        phase = 'construction';

    } else if (action == 'cellule' && phase == 'deplacement') {

        // Déplacement du pion sur la cellule choisie :
        var joueur = tour % joueurs;
        if (joueur == 0) {
            joueur = joueurs;
        }

        var c_joueur = {x: NaN, y: NaN};
        for (var y in pions) {
            for (var x in pions[y]) {
                if (pions[y][x] == joueur) {
                    c_joueur = {x: parseInt(x), y: parseInt(y)};
                }
            }
        }

        var deplacement = 'aucun';
        var reussi = false;
        //alert(`${murs[c_joueur.y][c_joueur.x]}, ${murs[c_joueur.y][c_joueur.x + 1]}, ${murs[c_joueur.y + 1][c_joueur.x]}, ${murs[c_joueur.y + 1][c_joueur.x + 1]}.`);
        //document.getElementById('debug').innerText = murs + pions
        //alert(`${pions[c.y + 2][c.x]}, ${pions[c.y + 1][c.x]}, ${murs[c_joueur.y][c_joueur.x]}, ${murs[c_joueur.y][c_joueur.x + 1]}, ${murs[c_joueur.y - 1][c_joueur.x]}, ${murs[c_joueur.y - 1][c_joueur.x + 1]}, ${pions[c.y + 2][c.x]}, ${pions[c.y][c.x]}.`)
        
        if (pions[c.y][c.x] == 0){
            try {
                if (pions[c.y + 1][c.x] == joueur && murs[c_joueur.y][c_joueur.x] != 'h' && murs[c_joueur.y][c_joueur.x + 1] != 'h') {
                    // HAUT
                    deplacement = 'haut'
                }
            } catch {
            }
            try {
                if (pions[c.y][c.x + 1] == joueur && murs[c_joueur.y][c_joueur.x] != 'v' && murs[c_joueur.y + 1][c_joueur.x] != 'v') {
                    // GAUCHE
                    deplacement = 'gauche'
                }
            } catch {
            }
            try {
                if (pions[c.y - 1][c.x] == joueur && murs[c_joueur.y + 1][c_joueur.x] != 'h' && murs[c_joueur.y + 1][c_joueur.x + 1] != 'h') {
                    // BAS
                    deplacement = 'bas'
                }
            } catch {
            }
            try {
                if (pions[c.y][c.x - 1] == joueur && murs[c_joueur.y][c_joueur.x + 1] != 'v' && murs[c_joueur.y + 1][c_joueur.x + 1] != 'v') {
                    // DROITE
                    deplacement = 'droite'
                }
            } catch {
            }
            try {
                if (pions[c.y + 2][c.x] == joueur && pions[c.y + 1][c.x] != 0 && murs[c_joueur.y][c_joueur.x] != 'h' && murs[c_joueur.y][c_joueur.x + 1] != 'h' && murs[c_joueur.y - 1][c_joueur.x] != 'h' && murs[c_joueur.y - 1][c_joueur.x + 1] != 'h') {
                    // SUPER-HAUT
                    deplacement = 'super_haut'
                }
            } catch {
            }
            try {
                if (pions[c.y][c.x + 2] == joueur && pions[c.y][c.x + 1] != 0 && murs[c_joueur.y][c_joueur.x] != 'v' && murs[c_joueur.y + 1][c_joueur.x] != 'v' && murs[c_joueur.y][c_joueur.x - 1] != 'v' && murs[c_joueur.y + 1][c_joueur.x - 1] != 'v') {
                    // SUPER-GAUCHE
                    deplacement = 'super_gauche'
                }
            } catch {
            }
            try {
                if (pions[c.y - 2][c.x] == joueur && pions[c.y - 1][c.x] != 0 && murs[c_joueur.y + 1][c_joueur.x] != 'h' && murs[c_joueur.y + 1][c_joueur.x + 1] != 'h' && murs[c_joueur.y + 2][c_joueur.x] != 'h' && murs[c_joueur.y + 2][c_joueur.x + 1] != 'h') {
                    // SUPER-BAS
                    deplacement = 'super_bas'
                }
            } catch {
            }
            try {
                if (pions[c.y][c.x - 2] == joueur && pions[c.y][c.x - 1] != 0 && murs[c_joueur.y][c_joueur.x + 1] != 'v' && murs[c_joueur.y + 1][c_joueur.x + 1] != 'v' && murs[c_joueur.y][c_joueur.x + 2] != 'v' && murs[c_joueur.y + 1][c_joueur.x + 2] != 'v') {
                    // SUPER-DROITE
                    deplacement = 'super_droite'
                }
            } catch {
            }
            try {
                if (pions[c.y + 1][c.x + 1] == joueur && murs[c_joueur.y][c_joueur.x] == 'a' &&
                    ((pions[c.y + 1][c.x] != 0 && murs[c_joueur.y + 1][c_joueur.x] != 'v' && murs[c_joueur.y][c_joueur.x - 1] != 'h'  &&
                      (murs[c_joueur.y][c_joueur.x - 1] == 'v' || murs[c_joueur.y + 1][c_joueur.x - 1] == 'v')
                    ) ||
                     (pions[c.y][c.x + 1] != 0 && murs[c_joueur.y][c_joueur.x + 1] != 'h' && murs[c_joueur.y - 1][c_joueur.x] != 'v' &&
                      (murs[c_joueur.y - 1][c_joueur.x] == 'h' || murs[c_joueur.y - 1][c_joueur.x + 1] == 'h')
                     )
                    )
                   ) {
                    // HAUT-GAUCHE
                    deplacement = 'haut_gauche'
                }
            } catch {
            }
            try {
                if (pions[c.y + 1][c.x - 1] == joueur && murs[c_joueur.y][c_joueur.x + 1] == 'a' &&
                    ((pions[c.y + 1][c.x] != 0 && murs[c_joueur.y + 1][c_joueur.x + 1] != 'v' && murs[c_joueur.y][c_joueur.x + 2] != 'h' &&
                      (murs[c_joueur.y][c_joueur.x + 2] == 'v' || murs[c_joueur.y + 1][c_joueur.x + 2] == 'v')
                    ) ||
                     (pions[c.y][c.x - 1] != 0 && murs[c_joueur.y][c_joueur.x] != 'h' && murs[c_joueur.y - 1][c_joueur.x + 1] != 'v' &&
                      (murs[c_joueur.y - 1][c_joueur.x] == 'h' || murs[c_joueur.y - 1][c_joueur.x + 1] == 'h')
                     )
                    )
                   ) {
                    // HAUT-DROITE
                    deplacement = 'haut_droite'
                }
            } catch {
            }
            try {
                if (pions[c.y - 1][c.x - 1] == joueur && murs[c_joueur.y + 1][c_joueur.x + 1] == 'a' &&
                    ((pions[c.y - 1][c.x] != 0 && murs[c_joueur.y][c_joueur.x + 1] != 'v' && murs[c_joueur.y + 1][c_joueur.x + 2] != 'h' &&
                      (murs[c_joueur.y][c_joueur.x + 2] == 'v' || murs[c_joueur.y + 1][c_joueur.x + 2] == 'v')
                    ) ||
                     (pions[c.y][c.x - 1] != 0 && murs[c_joueur.y + 1][c_joueur.x] != 'h' && murs[c_joueur.y + 2][c_joueur.x + 1] != 'v' &&
                      (murs[c_joueur.y + 2][c_joueur.x] == 'h' || murs[c_joueur.y + 2][c_joueur.x + 1] == 'h')
                     )
                    )
                   ) {
                    // BAS-DROITE
                    deplacement = 'bas_droite'
                }
            } catch {
            }
            try {
                if (pions[c.y - 1][c.x + 1] == joueur && murs[c_joueur.y + 1][c_joueur.x] == 'a' &&
                    ((pions[c.y - 1][c.x] != 0 && murs[c_joueur.y][c_joueur.x] != 'v' && murs[c_joueur.y + 1][c_joueur.x - 1] != 'h' &&
                      (murs[c_joueur.y][c_joueur.x - 2] == 'v' || murs[c_joueur.y + 1][c_joueur.x - 1] == 'v')
                    ) ||
                     (pions[c.y][c.x + 1] != 0 && murs[c_joueur.y + 1][c_joueur.x + 1] != 'h' && murs[c_joueur.y + 2][c_joueur.x] != 'v' &&
                      (murs[c_joueur.y + 2][c_joueur.x] == 'h' || murs[c_joueur.y + 2][c_joueur.x + 1] == 'h')
                     )
                    )
                   ) {
                    // BAS-GAUCHE
                    deplacement = 'bas_gauche'
                }
            } catch {
            }
            
            switch (deplacement) {
                case 'haut':
                    pions[c.y + 1][c.x] = 0;
                    reussi = true;
                    break;
                case 'gauche':
                    pions[c.y][c.x + 1] = 0;
                    reussi = true;
                    break;
                case 'bas':
                    pions[c.y - 1][c.x] = 0;
                    reussi = true;
                    break;
                case 'droite':
                    pions[c.y][c.x - 1] = 0;
                    reussi = true;
                    break;
                case 'super_haut':
                    pions[c.y + 2][c.x] = 0;
                    reussi = true;
                    break;
                case 'super_gauche':
                    pions[c.y][c.x + 2] = 0;
                    reussi = true;
                    break;
                case 'super_bas':
                    pions[c.y - 2][c.x] = 0;
                    reussi = true;
                    break;
                case 'super_droite':
                    pions[c.y][c.x - 2] = 0;
                    reussi = true;
                    break;
                case 'haut_gauche':
                    pions[c.y + 1][c.x + 1] = 0;
                    reussi = true;
                    break
                case 'haut_droite':
                    pions[c.y + 1][c.x - 1] = 0;
                    reussi = true;
                    break
                case 'bas_droite':
                    pions[c.y - 1][c.x - 1] = 0;
                    reussi = true;
                    break
                case 'bas_gauche':
                    pions[c.y - 1][c.x + 1] = 0;
                    reussi = true;
                    break
            }
            if (reussi) {
                document.getElementById(`pion-${joueur}`).style.transform = `translate(${c.x * 60}px, ${c.y * 60}px)`;
                pions[c.y][c.x] = joueur;

                ++tour;
                phase = 'deplacement';
            }
        }

    } else if (action == 'tourner' && phase == 'construction') {

        // Rotation du mur choisi :
        sens_mur += c;
        document.getElementById(`mur-${mur_choisi}`).style.transform = `translate(270px, 600px) rotate(${sens_mur}deg)`;
        
    } else if (action == 'joueurs' && phase == 'demarrage') {

        // Définition du nombre de joueurs et début de la partie :
        if (c == 2) {
            document.getElementById('pion-3').style.display = 'none';
            document.getElementById('pion-4').style.display = 'none';
            document.getElementById('pion-2').style.transform = 'translate(480px, 240px)';
            pions[0][4] = 0;
            pions[8][4] = 0;
            pions[4][8] = 2;
            joueurs = 2;
        } else {
            joueurs = 4;
        }
        document.getElementById('demarrer').style.display = 'none';
        tour = 1;
        phase = 'deplacement';
    }
}