import React, { useRef, useState } from "react";
import { nanoid } from "nanoid";
import { AiOutlinePlus,AiOutlineUpload,AiOutlineEdit, AiOutlineDelete} from "react-icons/ai";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import FlashCardSchema from "../validation/schema/CardSchema";
import { useDispatch } from "react-redux";
import { setFlashCard } from "../state/feature/flashcardSlice";
import TextError from "../validation/customErrorForm/TextError";

const CreateFlashCard = () => {

  // Dispaching our action 
  const dispatch = useDispatch(); 
  const filePickerRef = useRef(null); 
  const editRef = useRef(null);

  //creating state for group image initally it is empty string
  const [groupImg, setGroupImg] = useState(""); 

  const addFlashCard = (values, actions) => {
    dispatch(setFlashCard(values));
    actions.resetForm();
    setGroupImg("");
  };

  return (
    <Formik
    initialValues={{
      groupid: nanoid(), //to create unique group id
      groupname: "",
      groupdescription: "",
      groupimg: null,
      cards: [
        {
          cardid: nanoid(),   //to create unique Card  id
          cardname: "",
          carddescription: "",
        },
      ],
      createOn: new Date(Date.now()).toLocaleString(),
    }}
    validationSchema={FlashCardSchema}  //giving validation schema to the form to show error if values entered are wrong
    onSubmit={addFlashCard}
  >
    {({ values, isSubmitting, setFieldValue }) => (
      <Form className="w-full space-y-5 text-black-600 text-bold font-medium mb-10">
        <div className="md:flex flex-col px-10 py-4 bg-white drop-shadow-lg space-y-4 rounded-lg">
          <div className="flex flex-col sm:flex-row items-center space-x-10 pt-3">
            <div className="flex flex-col relative">
              <label htmlFor="createGroup" className="mb-2 ">Create Group *</label>
              <Field
                type="text"
                name="groupname"
                id="createGroup"
                placeholder=" Enter Group Name "
                className="outline-black-400 md:w-96 outline-2 py-3 rounded-lg outline focus:outline-red-400"
              />
              <ErrorMessage component={TextError} name="groupname" /> 
            </div>
            {groupImg ? (
              <img
                src={groupImg}
                alt="groupImg"
                className="w-28 h-28 object-contain"
              />
            ) : (
              <button
                type="button"
                onClick={() => filePickerRef.current.click()}
                className={`md:flex items-center px-10 py-2 mt-6 bg-white border-2 border-black active:border-red-600 text-red-700 font-semibold rounded-md space-x-2 `}
              >
                <AiOutlineUpload className="w-6 h-6" />
                <span>Upload Image</span>
                <input
                  type="file"
                  ref={filePickerRef}
                  value={groupImg}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.readAsDataURL(file);

                    reader.onload = () => {
                      setFieldValue("groupimg", reader.result);
                      setGroupImg(reader.result);
                    };
                  }}
                  hidden
                />
              </button>
            )}
          </div>

          <div className="flex flex-col w-full sm:w-[70%]">
            <label htmlFor="addDescription" className="mb-2">
              Add Description
            </label>
            <Field
              as="textarea"
              name="groupdescription"
              id="addDescription"
              rows={3}
              placeholder="Enter  Group  Description "
              className="resize-none outline outline-2  outline-black-400 rounded-lg   focus:outline focus:outline-red-400"
            />
            <ErrorMessage component={TextError} name="groupdescription" />
          </div>
        </div>

        <div className="text-black drop-shadow-lg ">
          {/*here we are creating the form for adding card and taking values of card field */}
          <FieldArray name="cards">
            {(arrayHelper) => {
              const cards = values.cards;   //taking values of card
              return (
                <div className="">
                  {cards && cards.length > 0
                    ? cards.map((cards, index) => (
                        <div
                          className="flex rounded-t-lg items-center space-x-5 bg-white px-5 lg:px-10 py-4"
                          key={index}
                        >
                          {/*give numbering to card field */}
                          <div className="w-4 h-4 px-3 py-3 flex items-center justify-center bg-black-400 text-white text-md font-semibold rounded-full opacity-95 ">
                            {index + 1} 
                          </div>
                          <div className="relative flex flex-col space-y-3 md:space-x-10 md:flex-row">
                            <div className="relative flex flex-col justify-center space-y-3">
                              <label htmlFor="enterTerm" className="mt-3">
                                Enter Term
                              </label>
                              <Field
                                type="text"
                                id="enterTerm"
                                name={`cards.${index}.cardname`}
                                innerRef={editRef}
                                placeholder="Enter Terms "
                                className="py-3 outline-black-400 md:w-56 outline outline-2 rounded-lg focus:outline focus:outline-red-400"
                              />
                              <ErrorMessage
                                component={TextError}
                                name={`cards.${index}.cardname`}
                              />
                            </div>
                            <div className="relative flex flex-col justify-center space-y-3">
                              <label htmlFor="enterDefinaton" className="">
                                Enter Defination
                              </label>
                              <Field
                                as="textarea"
                                id="enterDefination"
                                name={`cards.${index}.carddescription`}
                                placeholder="Enter Defination "
                                className=" lg:w-72  resize-none outline outline-black-400 outline-2 rounded-lg focus:outline focus:outline-red-400"
                              />
                              <ErrorMessage
                                component={TextError}
                                name={`cards.${index}.carddescription`}
                              />
                            </div>

                            <div className="flex items-center space-x-2">
                              <button
                                className={`hidden lg:flex lg:items-center lg:w-[19rem] px-2 py-2 bg-white border-2 border-slate-800 active:border-black-600 text-red-400 mt-8 font-semibold rounded-md space-x-2 `}
                                disabled={true}
                              >
                                <span> + Select Image</span>
                              </button>
                              <div className="flex items-center justify-around w-full md:flex-col md:space-y-5 md:mt-5">
                                <button
                                  type="button"
                                  onClick={() => arrayHelper.remove(index)} // will remove flashcard entry 
                                >
                                  <AiOutlineDelete className="w-4 h-4  text-rose-500" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => editRef.current.focus()}
                                >
                                  <AiOutlineEdit className="h-4 w-4 text-blue-700" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    : null}
                  <div className="bg-white rounded-b-lg flex w-full  mb-10 px-5 py-2">
                    <button
                      type="button"
                      //add flashcard entry 
                      onClick={() =>
                        arrayHelper.push({
                          cardid: nanoid(),
                          cardname: "",
                          carddescription: "",
                        })
                      }
                      className="flex items-center space-x-2 text-rose-600  text-md   mb-5 mt-0 "
                    >
                      <AiOutlinePlus />
                      <span>Add More</span>
                    </button>
                  </div>
                  <div className="flex justify-center w-full">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="py-2 px-6  bg-black text-white rounded-md outline outline-2 outline-white active:scale-100 transition-all duration-100 hover:scale-125"
                    >
                      Create
                    </button>
                  </div>
                </div>
              );
            }}
          </FieldArray>
        </div>
      </Form>
    )}
  </Formik>
  );
};

export default CreateFlashCard;
