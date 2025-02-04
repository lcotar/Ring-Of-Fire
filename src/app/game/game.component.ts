import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { PlayerComponent } from '../player/player.component';
import { FormsModule } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    PlayerComponent,
    FormsModule,
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  takeCardAnimation = false;
  currentCard: string = '';
  game: Game = new Game();
  card: any;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  pickCard() {
    if (!this.takeCardAnimation) {
      this.takeCardAnimation = true;
      let popCard = this.game.stack.pop();

      if (popCard !== undefined) {
        this.currentCard = popCard;
      }
      /* this.updateGame(); */
      this.game.currentPlayer++;
      this.game.currentPlayer =
        this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.takeCardAnimation = false;
        /* this.updateGame(); */
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name) => {
      this.game.players.push(name);
    });
  }
}
