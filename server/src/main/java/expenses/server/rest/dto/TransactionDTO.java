package expenses.server.rest.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class TransactionDTO {

	private final Long id;

	private final Integer day;

	private final String description;

	private final Long value;

	private final SubcategoryWithCategoryDTO subcategory;

}
