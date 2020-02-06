// Image factory
let createImage = function(src, title) {
    let img   = new Image();
    img.src   = src;
    img.alt   = title;
    img.title = title;
    return img; 
}

let keycapImages = [];// array of images
let letterImages = [];// array of letters

// pushes images into an array
keycapImages.push(createImage("imagesAndSounds/computer_key_A_T.png", "a"));
keycapImages.push(createImage("imagesAndSounds/computer_key_B_T.png", "b"));
keycapImages.push(createImage("imagesAndSounds/computer_key_C_T.png", "c"));
keycapImages.push(createImage("imagesAndSounds/computer_key_D_T.png", "d"));
keycapImages.push(createImage("imagesAndSounds/computer_key_E_T.png", "e"));
keycapImages.push(createImage("imagesAndSounds/computer_key_F_T.png", "f"));
keycapImages.push(createImage("imagesAndSounds/computer_key_G_T.png", "g"));
keycapImages.push(createImage("imagesAndSounds/computer_key_H_T.png", "h"));
keycapImages.push(createImage("imagesAndSounds/computer_key_I_T.png", "i"));
keycapImages.push(createImage("imagesAndSounds/computer_key_J_T.png", "j"));
keycapImages.push(createImage("imagesAndSounds/computer_key_K_T.png", "k"));
keycapImages.push(createImage("imagesAndSounds/computer_key_L_T.png", "l"));
keycapImages.push(createImage("imagesAndSounds/computer_key_M_T.png", "m"));
keycapImages.push(createImage("imagesAndSounds/computer_key_N_T.png", "n"));
keycapImages.push(createImage("imagesAndSounds/computer_key_O_T.png", "o"));
keycapImages.push(createImage("imagesAndSounds/computer_key_P_T.png", "p"));
keycapImages.push(createImage("imagesAndSounds/computer_key_Q_T.png", "q"));
keycapImages.push(createImage("imagesAndSounds/computer_key_R_T.png", "r"));
keycapImages.push(createImage("imagesAndSounds/computer_key_S_T.png", "s"));
keycapImages.push(createImage("imagesAndSounds/computer_key_T_T.png", "t"));
keycapImages.push(createImage("imagesAndSounds/computer_key_U_T.png", "u"));
keycapImages.push(createImage("imagesAndSounds/computer_key_V_T.png", "v"));
keycapImages.push(createImage("imagesAndSounds/computer_key_W_T.png", "w"));
keycapImages.push(createImage("imagesAndSounds/computer_key_X_T.png", "x"));
keycapImages.push(createImage("imagesAndSounds/computer_key_Y_T.png", "y"));
keycapImages.push(createImage("imagesAndSounds/computer_key_Z_T.png", "z"));
keycapImages.push(createImage("imagesAndSounds/computer_key_brackets_left_T.png", "["));
keycapImages.push(createImage("imagesAndSounds/computer_key_Colon_Semicolon_T.png", ";"));
keycapImages.push(createImage("imagesAndSounds/computer_key_Greater_than_Period_T.png", "."));
keycapImages.push(createImage("imagesAndSounds/computer_key_num_row_0_T.png", "0"));
keycapImages.push(createImage("imagesAndSounds/computer_key_num_row_1_T.png", "1"));
keycapImages.push(createImage("imagesAndSounds/computer_key_num_row_2_T.png", "2"));
keycapImages.push(createImage("imagesAndSounds/computer_key_num_row_3_T.png", "3"));
keycapImages.push(createImage("imagesAndSounds/computer_key_num_row_4_T.png", "4"));
keycapImages.push(createImage("imagesAndSounds/computer_key_num_row_5_T.png", "5"));
keycapImages.push(createImage("imagesAndSounds/computer_key_num_row_6_T.png", "6"));
keycapImages.push(createImage("imagesAndSounds/computer_key_num_row_7_T.png", "7"));
keycapImages.push(createImage("imagesAndSounds/computer_key_num_row_8_T.png", "8"));
keycapImages.push(createImage("imagesAndSounds/computer_key_num_row_9_T.png", "9"));
keycapImages.push(createImage("imagesAndSounds/computer_key_num_row_Equals_T.png", "="));
keycapImages.push(createImage("imagesAndSounds/computer_key_num_row_Minus_T.png", "-"));
keycapImages.push(createImage("imagesAndSounds/computer_key_Question_Forward_slash_T.png", "/"));
keycapImages.push(createImage("imagesAndSounds/computer_key_Pipe_Backslash_T.png", "\\"));
keycapImages.push(createImage("imagesAndSounds/computer_key_Quotation_Marks_T.png", "'"));


letterImages.push(createImage("imagesAndSounds/computer_key_A_T.png", "a"));
letterImages.push(createImage("imagesAndSounds/computer_key_B_T.png", "b"));
letterImages.push(createImage("imagesAndSounds/computer_key_C_T.png", "c"));
letterImages.push(createImage("imagesAndSounds/computer_key_D_T.png", "d"));
letterImages.push(createImage("imagesAndSounds/computer_key_E_T.png", "e"));
letterImages.push(createImage("imagesAndSounds/computer_key_F_T.png", "f"));
letterImages.push(createImage("imagesAndSounds/computer_key_G_T.png", "g"));
letterImages.push(createImage("imagesAndSounds/computer_key_H_T.png", "h"));
letterImages.push(createImage("imagesAndSounds/computer_key_I_T.png", "i"));
letterImages.push(createImage("imagesAndSounds/computer_key_J_T.png", "j"));
letterImages.push(createImage("imagesAndSounds/computer_key_K_T.png", "k"));
letterImages.push(createImage("imagesAndSounds/computer_key_L_T.png", "l"));
letterImages.push(createImage("imagesAndSounds/computer_key_M_T.png", "m"));
letterImages.push(createImage("imagesAndSounds/computer_key_N_T.png", "n"));
letterImages.push(createImage("imagesAndSounds/computer_key_O_T.png", "o"));
letterImages.push(createImage("imagesAndSounds/computer_key_P_T.png", "p"));
letterImages.push(createImage("imagesAndSounds/computer_key_Q_T.png", "q"));
letterImages.push(createImage("imagesAndSounds/computer_key_R_T.png", "r"));
letterImages.push(createImage("imagesAndSounds/computer_key_S_T.png", "s"));
letterImages.push(createImage("imagesAndSounds/computer_key_T_T.png", "t"));
letterImages.push(createImage("imagesAndSounds/computer_key_U_T.png", "u"));
letterImages.push(createImage("imagesAndSounds/computer_key_V_T.png", "v"));
letterImages.push(createImage("imagesAndSounds/computer_key_W_T.png", "w"));
letterImages.push(createImage("imagesAndSounds/computer_key_X_T.png", "x"));
letterImages.push(createImage("imagesAndSounds/computer_key_Y_T.png", "y"));
letterImages.push(createImage("imagesAndSounds/computer_key_Z_T.png", "z"));