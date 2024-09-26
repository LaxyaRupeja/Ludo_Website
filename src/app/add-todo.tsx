"use client";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogFooter, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";

export function AddTodo() {
    const [todoContent, setTodoContent] = useState("");
    const router = useRouter();


    const addTodoMutation = trpc.createTodo.useMutation({
        onSettled: () => {
            router.refresh();
        }
    });

    return (
        <Dialog>
            <DialogTrigger asChild className=" justify-self-end w-min">
                <Button className="flex gap-2">
                    <PlusCircle size={16} /> Add Todo
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add Todo
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <Input onChange={
                        (e) => {
                            setTodoContent(e.target.value);
                        }
                    } value={todoContent} type="text" placeholder="Title" className="border p-2 rounded-md" />
                    <DialogFooter>
                        <Button onClick={
                            () => {
                                addTodoMutation.mutate(todoContent);
                                if (addTodoMutation.isSuccess) {
                                    setTodoContent("");
                                }
                            }
                        }>
                            {
                                addTodoMutation.isPending ? "Adding..." : "Add"
                            }
                        </Button>
                        <DialogClose>Cancel</DialogClose>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}

