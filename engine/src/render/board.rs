 use std::fmt;

use crate::common::coord::Coord;
use crate::board::board::{Board, BOARD_WIDTH};
 use crate::render::piece::get_symbol_for_piece;

impl fmt::Display for Board {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        let mut result = String::new();

        let mut file = 0;
        let mut rank = 7;

        loop {
            let char = match self.get_piece(&Coord::new(file, rank)) {
                Some(p) => get_symbol_for_piece(&p),
                None => '_'
            };

            result.push_str(format!(" {} ", char).as_str());

            file += 1;

            if file == BOARD_WIDTH as i8 {
                result.push('\n');

                file = 0;

                if rank != 0 {
                    rank -= 1;
                } else {
                    break;
                }
            }
        }

        return write!(f, "{}", result);
    }
}
